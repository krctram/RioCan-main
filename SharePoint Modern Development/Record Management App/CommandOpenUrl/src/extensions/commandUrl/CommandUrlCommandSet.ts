import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'CommandUrlCommandSetStrings';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ICommandUrlCommandSetProperties {
  // This is an example; replace with your own properties
  sampleTextOne: string;
  sampleTextTwo: string;
}

const LOG_SOURCE: string = 'CommandUrlCommandSet';

export default class CommandUrlCommandSet extends BaseListViewCommandSet<ICommandUrlCommandSetProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized CommandUrlCommandSet');
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const compareOneCommand: Command = this.tryGetCommand('COMMAND_1');
    if (compareOneCommand) {
      // This command should be hidden unless exactly one row is selected.
      //compareOneCommand.visible = event.selectedRows.length === 1;
    }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    let IDs = [];
    let DocUrl = [];
    let SiteName = this.context.pageContext.legacyPageContext.webServerRelativeUrl.replace("/sites/",'')
    for (let i = 0; i < event.selectedRows.length; i++) {
      let id = event.selectedRows[i].getValueByName("ID");
      let urls =  event.selectedRows[i].getValueByName("FileRef");
      IDs.push(id);
      DocUrl.push(urls);
    }
    let AllIds = IDs.join(';');
    let AllDocUrl = DocUrl.join(';');
    let test = this.context.pageContext.legacyPageContext.listUrl;
    let indexof = test.indexOf("lists");
    let listname = indexof != -1?test.split("/")[4]:test.split("/")[3]
    console.log("List Name",listname);
    console.log("Upadted",);
    let SiteUrl = "https://riocan.sharepoint.com/sites/RMS/Pages/CustomUpload.aspx";
    let URl =SiteUrl+ "?LeafRef="+AllDocUrl+"&ItemIDs="+AllIds+"&SiteURL="+SiteName + "&Doclib="+listname;
    window.open(URl, '_blank');
  
    
  }
}
