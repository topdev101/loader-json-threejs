import jsonfile from "jsonfile";
var data = null;

// Load JSON file asynchronously
jsonfile.readFile("../static/json/projectDataStructure.json", (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  //   console.log(data);
  data = res;
  project();
});

function asd() {
  console.log(
    data.faces[
      data.facades[data.massings[data.project.massings[0]].facades[0]].faces[0]
    ]
  );
  console.log(
    data.ribbons[
      data.faces[
        data.facades[data.massings[data.project.massings[0]].facades[0]]
          .faces[0]
      ].ribbons[0]
    ]
  );
  console.log(
    data.panels[
      data.ribbons[
        data.faces[
          data.facades[data.massings[data.project.massings[0]].facades[0]]
            .faces[0]
        ].ribbons[0]
      ].panels[0]
    ]
  );

  console.log(
    data.units[
      data.panels[
        data.ribbons[
          data.faces[
            data.facades[data.massings[data.project.massings[0]].facades[0]]
              .faces[0]
          ].ribbons[0]
        ].panels[0]
      ].units[0]
    ]
  );

  console.log(
    data.skins[
      data.units[
        data.panels[
          data.ribbons[
            data.faces[
              data.facades[data.massings[data.project.massings[0]].facades[0]]
                .faces[0]
            ].ribbons[0]
          ].panels[0]
        ].units[0]
      ].skins[0].id
    ]
  );
}

function project() {
  data.massings.map((massing) => {});
}

function massingDrawing() {}

function facadeDrawing(facade_id) {
  data.faceDrawing(face_id);
}

function faceDrawing(face_id) {}

function ribbonDrawing(ribbon_id) {}

function panelDrawing(panel_id) {}
