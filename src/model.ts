import {
  isArray, mapValues, pull, setWith, toPairs, unset, values,
} from 'lodash';
import { denormalize, normalize, schema } from 'normalizr';
import produce from 'immer';
import { createSelector } from 'reselect';
import { AnyAction, Reducer } from 'redux';

export class Model {
  public readonly namespace: string;

  public readonly scopes: string[];

  private readonly fields: object;

  public readonly defaultScope: string;

  public readonly defaultScopeIdField: string;

  public readonly views: Record<string, ViewFunction>;

  public readonly controllers: Record<string, ControllerFunction>;

  private _schema: schema.Entity;

  public constructor(options: ModelOptions) {
    this.namespace = options.namespace;
    this.scopes = options.scopes;
    this.fields = options.fields;
    this.defaultScope = options.defaultScope || 'byId';
    this.defaultScopeIdField = options.defaultScopeIdField || 'id';
    this.views = options.views || {};
    this.controllers = options.controllers || {};

    this._schema = this.schema();

    this.schema = this.schema.bind(this);
    this.actionTypes = this.actionTypes.bind(this);
    this.selectors = this.selectors.bind(this);
    this.reducers = this.reducers.bind(this);
  }

  public schema(): schema.Entity {
    // @ts-ignore
    return new schema.Entity(this.namespace, mapValues(
      this.fields,
      (fieldValue: Model | Model[], fieldKey: string) => {
        if (fieldValue instanceof Model) return fieldValue.schema();
        if (isArray(fieldValue)) return fieldValue.map(arrayValue => arrayValue.schema());
        throw {
          name: 'InvalidFieldType',
          message: `Field types can only be arrays and Model instances. 
          Field ${fieldKey} had a ${typeof fieldValue} value.`,
        };
      },
    ));
  }

  public actionTypes(): ActionTypes {
    return {
      clear: `${this.namespace}.clear`,
      remove: `${this.namespace}.remove`,
      set: `${this.namespace}.set`,
    };
  }

  public actions(): Actions {
    const actionTypes = this.actionTypes();

    const verifyIsScopeValid = (scope: string): void => {
      if (![this.defaultScope, ...this.scopes].includes(scope)) {
        throw {
          name: 'InvalidScope',
          message: `The available scopes are: ${[this.defaultScope, ...this.scopes].join(', ')}.`,
        };
      }
    };

    return {
      clear: (scope: string) => {
        verifyIsScopeValid(scope);
        return { type: actionTypes.clear, scope };
      },
      remove: (scope: string, scopeId: ScopeId) => {
        verifyIsScopeValid(scope);
        return { type: actionTypes.remove, scope, scopeId };
      },
      set: (scope: string, scopeId: ScopeId, payload: object | object[]) => {
        verifyIsScopeValid(scope);
        return {
          type: actionTypes.set, scope, scopeId, payload: isArray(payload) ? payload : [payload],
        };
      },
    };
  }

  public selectors(scope: string, scopeId: ScopeId): SelectorFunction {
    let selectorFunc = null;

    const getDefaultScope = state => state[this.defaultScope];

    if (scope === this.defaultScope) {
      selectorFunc = state => denormalize(
        scopeId,
        this._schema,
        mapValues(state, getDefaultScope),
      );
    } else {
      selectorFunc = state => denormalize(
        state[this.namespace][scope][scopeId],
        new schema.Array(this._schema),
        mapValues(state, getDefaultScope),
      );
    }

    return createSelector([selectorFunc], data => data);
  }

  public reducers(): Reducer<unknown, AnyAction> {
    const actionTypes = this.actionTypes();

    return produce((draft: object, {
      type, scope, scopeId, payload,
    }) => {
      switch (type) {
        case actionTypes.clear:
          if (scope === this.defaultScope) draft[this.namespace] = mapValues(draft, () => ({}));
          else draft[this.namespace][scope] = {};
          return;

        case actionTypes.remove:
          // We use pull and unset, because they mutate an existing object. In this case the draft. That is
          // important in order to keep unaffected objects untouched. Otherwise that could cause unnecessary
          // re-renders in unrelated components.
          if (scope === this.defaultScope) {
            unset(draft, `${this.namespace}.${this.defaultScope}.${scopeId}`);

            for (const scope in this.scopes) {
              for (const currentScopeId in draft[this.namespace][scope]) {
                pull(draft[this.namespace][scope][currentScopeId], [scopeId]);
              }
            }
          } else {
            unset(draft, `${this.namespace}.${scope}.${scopeId}`);
          }
          return;

        case actionTypes.set:
          // We use setWith because it mutates an existing object. In this case the draft. That is important
          // in order to keep unaffected objects untouched. Otherwise that could cause unnecessary re-renders
          // in unrelated components.
          const idsForScopeId = [];

          for (const instance of payload) {
            const normalizedData = normalize(instance, this._schema);

            const entityEntries: [string, object[]][] = toPairs(normalizedData.entities);

            for (const [entityName, entities] of entityEntries) {
              for (const entity of values(entities)) {
                setWith(
                  draft,
                  `${entityName}.${this.defaultScope}.${entity[this.defaultScopeIdField]}`,
                  entity,
                  Object,
                );
              }
            }

            idsForScopeId.push(
              ...values(
                normalizedData.entities[this.namespace]
              ).map(entity => entity[this.defaultScopeIdField]),
            );
          }

          if (scope !== this.defaultScope) {
            setWith(
              draft,
              `${this.namespace}.${scope}.${scopeId}`,
              idsForScopeId,
              Object,
            );
          }
      }
    }, {});
  }
}
