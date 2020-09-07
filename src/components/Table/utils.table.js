export const isToolbarPresent = (toolBar) => {
  let isTrue = false;
  toolBar.forEach((tool) => {
    let resultCheck;
    if (tool.privilegio !== null && tool.privilegio !== undefined) {
      resultCheck = tool.privilegio;
    } else {
      resultCheck = true;
    }
    if (resultCheck) {
      isTrue = true;
    }
  });
  return isTrue;
};
