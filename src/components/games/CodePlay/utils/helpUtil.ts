export function getHelpFileName(helpPageId: string) {
  let fileName = `codePlay/${helpPageId}.`;
  switch (helpPageId) {
    case "0":
      fileName += "pencilOnly";
      break;
    case "1":
      fileName += "jump";
      break;
    case "2":
      fileName += "jumpWithParameters";
      break;
    case "3":
      fileName += "resetDisplay";
      break;
    case "4":
      fileName += "deleteAndAddStatement";
      break;
    case "5":
      fileName += "stroke";
      break;
    case "6":
      fileName += "statementGroups";
      break;
    case "7":
      fileName += "strokeWithParameters";
      break;
    case "8":
      fileName += "turn";
      break;
    default: 
      fileName += "noHelp";
    }
    fileName += ".html";
    return fileName;
}