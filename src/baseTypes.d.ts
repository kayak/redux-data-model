type ScopeId = string | number;
type SelectorFunction = (state: object, props?: object) => any;
type ViewFunction = (instance) => any;
type ControllerFunction = (instance: any) => void;

interface ModelOptions {
  namespace: string;
  scopes: string[];
  fields: object;
  defaultScope?: string;
  defaultScopeIdField?: string;
  views?: Record<string, ViewFunction>;
  controllers?: Record<string, ControllerFunction>;
}

interface ActionTypes {
  clear: string;
  remove: string;
  set: string;
}

interface Actions {
  clear: Function;
  remove: Function;
  set: Function;
}
