export const showError = function(message: string) {
  document.getElementById("messageArea")!.innerHTML=message;
}

export const clearErrors = function() {
  document.getElementById("messageArea")!.innerHTML="";
}