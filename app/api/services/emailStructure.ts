export default function emailStructure(otp: number) {
  return `<div
    style="
      font-family: Franklin Gothic;
      max-width: 550px;
      background: #FBFCFA;
      margin: auto;
      padding: 10px;
      border-radius: 15px;
    "
  >
      Your otp is <strong>${otp}</strong>
  </div>`;
}
