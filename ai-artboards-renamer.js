
main();

function main() {
  var
    input,
    line,
    parts,
    countChecked,
    countRenamed,
    doc,
    artboards,
    artboard,
    artboardName,
    index;

  input = File.openDialog(
    'Select txt file with list of artboards names',
    function(file) {
      var
        name = file.displayName;
      return name.indexOf('.') == -1 || name.split('.').slice(-1)[0] == 'txt' || file instanceof Folder;
    }
  );

  if (!input) {
    alert('File not selected');
    return;
  }

  if (!input.open('r')) {
    alert('File cannot be reading');
    return;
  }

  doc = app.activeDocument;
  artboards = doc.artboards;

  countChecked = 0;
  countRenamed = 0;
  for (index = 0; index < artboards.length && !input.eof; index++) {
    line = input.readln();

    artboard = artboards[index];
    parts = line
      .split('/')
      .slice(-1)[0]
      .split('\\')
      .slice(-1)[0]
      .split('.');

    parts = parts.length > 1
      ? parts.slice(0, -1)
      : parts;

    artboardName = parts.join('.');

    if (artboardName) {
      countChecked ++;
      if (artboard.name != artboardName) {
        countRenamed ++;
        artboard.name = artboardName;
      }
    }
    else {
      index --;
    }
  }

  alert('Done ' + countChecked + ' artboards checked and ' + countRenamed + ' renamed');
}





