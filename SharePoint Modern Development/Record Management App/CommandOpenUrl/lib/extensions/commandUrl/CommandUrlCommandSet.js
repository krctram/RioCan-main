var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import { BaseListViewCommandSet } from '@microsoft/sp-listview-extensibility';
var LOG_SOURCE = 'CommandUrlCommandSet';
var CommandUrlCommandSet = /** @class */ (function (_super) {
    __extends(CommandUrlCommandSet, _super);
    function CommandUrlCommandSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommandUrlCommandSet.prototype.onInit = function () {
        Log.info(LOG_SOURCE, 'Initialized CommandUrlCommandSet');
        return Promise.resolve();
    };
    CommandUrlCommandSet.prototype.onListViewUpdated = function (event) {
        var compareOneCommand = this.tryGetCommand('COMMAND_1');
        if (compareOneCommand) {
            // This command should be hidden unless exactly one row is selected.
            //compareOneCommand.visible = event.selectedRows.length === 1;
        }
    };
    CommandUrlCommandSet.prototype.onExecute = function (event) {
        var IDs = [];
        var DocUrl = [];
        var mainsiteUrl = this.context.pageContext.legacyPageContext.webAbsoluteUrl.replace(this.context.pageContext.legacyPageContext.webServerRelativeUrl, "");
        var SiteName = this.context.pageContext.legacyPageContext.webServerRelativeUrl.replace("/sites/", '');
        for (var i = 0; i < event.selectedRows.length; i++) {
            var id = event.selectedRows[i].getValueByName("ID");
            var urls = event.selectedRows[i].getValueByName("FileRef");
            IDs.push(id);
            DocUrl.push(urls);
        }
        var AllIds = IDs.join(';');
        var AllDocUrl = DocUrl.join(';');
        var test = this.context.pageContext.legacyPageContext.listUrl;
        var indexof = test.indexOf("lists");
        var listname = indexof != -1 ? test.split("/")[4] : test.split("/")[3];
        console.log("List Name", listname);
        console.log("Upadted");
        //this.context.pageContext.legacyPageContext.webAbsoluteUrl
        var SiteUrl = "https://riocan.sharepoint.com/sites/RMS/Pages/CustomUpload.aspx";
        var URl = SiteUrl + "?LeafRef=" + AllDocUrl + "&ItemIDs=" + AllIds + "&SiteURL=" + SiteName + "&Doclib=" + listname;
        window.open(URl, '_blank');
        // for (let i = 0; i < IDs.length; i++) {
        //   let URl =SiteUrl+ "?ItemID="+IDs[i]+"&SiteURL="+SiteUrl + "&LibraryName="+listname;
        // window.open(URl, '_blank');
        //}
    };
    __decorate([
        override
    ], CommandUrlCommandSet.prototype, "onInit", null);
    __decorate([
        override
    ], CommandUrlCommandSet.prototype, "onListViewUpdated", null);
    __decorate([
        override
    ], CommandUrlCommandSet.prototype, "onExecute", null);
    return CommandUrlCommandSet;
}(BaseListViewCommandSet));
export default CommandUrlCommandSet;
//# sourceMappingURL=CommandUrlCommandSet.js.map