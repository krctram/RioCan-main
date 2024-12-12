import { BaseListViewCommandSet, IListViewCommandSetListViewUpdatedParameters, IListViewCommandSetExecuteEventParameters } from '@microsoft/sp-listview-extensibility';
/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ICommandUrlCommandSetProperties {
    sampleTextOne: string;
    sampleTextTwo: string;
}
export default class CommandUrlCommandSet extends BaseListViewCommandSet<ICommandUrlCommandSetProperties> {
    onInit(): Promise<void>;
    onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void;
    onExecute(event: IListViewCommandSetExecuteEventParameters): void;
}
//# sourceMappingURL=CommandUrlCommandSet.d.ts.map