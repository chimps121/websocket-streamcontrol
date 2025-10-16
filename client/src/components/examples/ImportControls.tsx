import ImportControls from "../ImportControls";

export default function ImportControlsExample() {
  return (
    <ImportControls
      onStartGGImport={(p1, p2) => console.log("Imported:", p1, p2)}
      onXMLImport={(data) => console.log("XML data:", data)}
    />
  );
}
