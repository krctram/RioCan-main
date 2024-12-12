declare interface ICommandUrlCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'CommandUrlCommandSetStrings' {
  const strings: ICommandUrlCommandSetStrings;
  export = strings;
}
