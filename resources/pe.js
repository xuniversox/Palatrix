window.onload = function () {
  var PalatrixPanel = document.getElementById("Palatrix-Panel");
  PalatrixPanel.addEventListener(
    "contextmenu",
    function (e) {
      e.preventDefault();
    },
    false
  );

  var ColorPicker = document.getElementById("ColorPicker");
  var ColorChoice = document.getElementById("ColorPicker").value;
  var ColorBox = document.getElementsByClassName("ColorBox");
  var RGB_Regex = /\d+/g;

  let ColorPicked = new Map([["ColorPicked", "#000000"]]);

  function RGB_Random() {
    var RGB =
      "rgb(" +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      ")";

    return RGB;
  }

  for (let i = 0; i < ColorBox.length; i++) {
    ColorBox[i].style.backgroundColor = RGB_Random();
    ColorBox[i].addEventListener("click", function () {
      console.log(i);
      ColorChoice = document.getElementById("ColorPicker").value;
      ColorBox[i].style.backgroundColor = ColorChoice;
      ColorPicked.set("ColorPicked" + i, ColorPicker.value);
      console.log(
        "This is ColorPicked = " + ColorPicked.get("ColorPicked" + i)
      );
    });

    ColorBox[i].addEventListener("contextmenu", function (event) {
      console.log(i);
      event.preventDefault();
      ColorPicker.value = ColorPicked.get("ColorPicked" + i);

      console.log(ColorBox[i].style.backgroundColor);
      console.log(
        "This is ColorPicked = " + ColorPicked.get("ColorPicked" + i)
      );
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.code == "Space") {
      console.log("Pressed Space");
      var text = "";
      var FormatText = "";
      var RGB_Index = 0;
      for (let i = 0; i < ColorBox.length; i++) {
        RGB_Index += 1;
        text += ColorBox[i].style.backgroundColor + "\n";

        FormatText = text.match(RGB_Regex);
        console.log(typeof FormatText);
        if (RGB_Index % 3 == 0) {
        }
      }
      console.log(FormatText);
      var filename = "my-file.txt";
      var blob = new Blob([FormatText], { type: "text/plain" });
      var link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      console.log("Key pressed:", event.key);
    }
  });
};
