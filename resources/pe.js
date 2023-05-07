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
  var RGB_Regex = /(\d+\s){2}\d+/s;

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

  /*   function RGB_Hex(r, g, b) {
    var hex = ((r << 16) | (g << 8) | b).toString(16);
    return "#" + ("000000" + hex).slice(-6);
  } */

  function RGB_Hex(rgb) {
    var r = Number(rgb[0]).toString(16).padStart(2, "0");
    var g = Number(rgb[1]).toString(16).padStart(2, "0");
    var b = Number(rgb[2]).toString(16).padStart(2, "0");
    return r + g + b;
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

  //JASC-PAL

  document.addEventListener("keydown", function (event) {
    if (event.code == "Space") {
      var PaletteFormatSelector = document.getElementById(
        "PaletteFormatSelector"
      );
      console.log(PaletteFormatSelector);

      var PaletteFormatOption =
        PaletteFormatSelector.options[PaletteFormatSelector.selectedIndex];

      var PaletteFormatOptionText = PaletteFormatOption.text;
      console.log(PaletteFormatOptionText);
      console.log("Pressed Space");
      if (PaletteFormatOptionText == "PAL") {
        var ColorBoxes = document.querySelectorAll(".ColorBox");
        var ColorFormat = "";
        var ColorNumber = 0;
        var i = 0;
        if (i == 0) {
          ColorFormat += "JASC-PAL" + "\n";
          ColorFormat += "0100" + "\n";
        }

        for (ColorNumber = 0; ColorNumber < ColorBoxes.length; ColorNumber++);

        ColorFormat += String(ColorNumber - 1) + "\n";

        for (i = 0; i < ColorBoxes.length; i++) {
          var ColorBox = ColorBoxes[i];
          var RGBValue = ColorBox.style.backgroundColor.match(/\d+/g);
          ColorFormat += RGBValue.join(" ") + "\n";
        }
        console.log(ColorFormat);
        var filename = "my-file.pal";
        var blob = new Blob([ColorFormat], { type: "text/plain" });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        console.log("Key pressed:", event.key);
      }

      //GIMP-PAL
      if (PaletteFormatOptionText == "GPL") {
        var ColorBoxes = document.querySelectorAll(".ColorBox");
        var ColorFormat = "";
        var ColorNumber = 0;
        var PaletteName = "DEFAULT";
        var i = 0;
        if (i == 0) {
          ColorFormat += "GIMP Palette" + "\n";
          ColorFormat += "#Palette Name: " + PaletteName + "\n";
          ColorFormat += "#Description: " + PaletteName + "\n";
        }

        for (ColorNumber = 0; ColorNumber < ColorBoxes.length; ColorNumber++);

        ColorFormat += "#Colors: " + String(ColorNumber - 1) + "\n";

        for (i = 0; i < ColorBoxes.length; i++) {
          var ColorBox = ColorBoxes[i];
          var RGBValue = ColorBox.style.backgroundColor.match(/\d+/g);
          ColorFormat += RGBValue.join(" ");

          if (i % 1 == 0) {
            ColorFormat += " " + RGB_Hex(RGBValue);
          }
          ColorFormat += "\n";
        }
        console.log(ColorFormat);
        var filename = "my-file.gpl";
        var blob = new Blob([ColorFormat], { type: "text/plain" });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        console.log("Key pressed:", event.key);
      }
      //////END OF GIMP PAL

      //TXT-PAL
      if (PaletteFormatOptionText == "TXT") {
        var ColorBoxes = document.querySelectorAll(".ColorBox");
        var ColorFormat = "";
        var ColorNumber = 0;
        var PaletteName = "DEFAULT";
        var i = 0;
        if (i == 0) {
          ColorFormat += ";paint.net Palette File" + "\n";
          ColorFormat += ";Downloaded from Palatrix" + "\n";
          ColorFormat += "#Palette Name: " + PaletteName + "\n";
          ColorFormat += "#Description: " + PaletteName + "\n";
        }

        for (ColorNumber = 0; ColorNumber < ColorBoxes.length; ColorNumber++);

        ColorFormat += "#Colors: " + String(ColorNumber - 1) + "\n";

        for (i = 0; i < ColorBoxes.length; i++) {
          var ColorBox = ColorBoxes[i];
          var RGBValue = ColorBox.style.backgroundColor.match(/\d+/g);

          if (i % 1 == 0) {
            ColorFormat += "FF" + RGB_Hex(RGBValue);
          }
          ColorFormat += "\n";
        }
        console.log(ColorFormat);
        var filename = "my-file.txt";
        var blob = new Blob([ColorFormat], { type: "text/plain" });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        console.log("Key pressed:", event.key);
      }
      //////END OF TXT PAL

      //HEX-PAL
      if (PaletteFormatOptionText == "HEX") {
        var ColorBoxes = document.querySelectorAll(".ColorBox");
        var ColorFormat = "";
        var ColorNumber = 0;
        var PaletteName = "DEFAULT";

        for (var i = 0; i < ColorBoxes.length; i++) {
          var ColorBox = ColorBoxes[i];
          var RGBValue = ColorBox.style.backgroundColor.match(/\d+/g);

          if (i % 1 == 0) {
            ColorFormat += RGB_Hex(RGBValue);
          }
          ColorFormat += "\n";
        }
        console.log(ColorFormat);
        var filename = "my-file.hex";
        var blob = new Blob([ColorFormat], { type: "text/plain" });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        console.log("Key pressed:", event.key);
      }
      //////END OF HEX PAL

      //END OF SPACE
    }
  });
};
