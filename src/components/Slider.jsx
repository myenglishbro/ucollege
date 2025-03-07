import React from "react";
import "../style2.css"; // Asegúrate de que exista y contenga tus estilos

function Slider() {
  return (
    <main>
      {/* Primer slider */}
      <div
        className="slider"
        style={{
          "--width": "100px",
          "--height": "50px",
          "--quantity": 10,
        }}
      >
        <div className="list">
          <div className="item" style={{ "--position": 1 }}>
            <img src="https://i.ibb.co/VpvYPXmM/file-Qb-WLou8j-Ui5-SCqob-CQTs-Rq.png" alt="" />
          </div>
          <div className="item" style={{ "--position": 2 }}>
            <img src="https://i.ibb.co/VpvYPXmM/file-Qb-WLou8j-Ui5-SCqob-CQTs-Rq.png" alt="" />
          </div>
          <div className="item" style={{ "--position": 3 }}>
            <img src=".https://i.ibb.co/VpvYPXmM/file-Qb-WLou8j-Ui5-SCqob-CQTs-Rq.png" alt="" />
          </div>
          <div className="item" style={{ "--position": 4 }}>
            <img src="https://i.ibb.co/VpvYPXmM/file-Qb-WLou8j-Ui5-SCqob-CQTs-Rq.png" alt="" />
          </div>
          <div className="item" style={{ "--position": 5 }}>
            <img src="https://i.ibb.co/VpvYPXmM/file-Qb-WLou8j-Ui5-SCqob-CQTs-Rq.png" alt="" />
          </div>
          <div className="item" style={{ "--position": 6 }}>
            <img src="https://i.ibb.co/VpvYPXmM/file-Qb-WLou8j-Ui5-SCqob-CQTs-Rq.png" alt="" />
          </div>
          <div className="item" style={{ "--position": 7 }}>
            <img src="https://i.ibb.co/VpvYPXmM/file-Qb-WLou8j-Ui5-SCqob-CQTs-Rq.png" alt="" />
          </div>
          <div className="item" style={{ "--position": 8 }}>
            <img src="../images/slider1_8.png" alt="" />
          </div>
          <div className="item" style={{ "--position": 9 }}>
            <img src="../images/slider1_9.png" alt="" />
          </div>
          <div className="item" style={{ "--position": 10 }}>
            <img src="../images/slider1_10.png" alt="" />
          </div>
        </div>
      </div>

      {/* Segundo slider (con el atributo 'reverse="true"') */}
      <div
        className="slider"
        reverse="true"
        style={{
          "--width": "200px",
          "--height": "200px",
          "--quantity": 9,
        }}
      >
        <div className="list">
          <div className="item" style={{ "--position": 1 }}>
            <img src="https://i.ibb.co/VpvYPXmM/file-Qb-WLou8j-Ui5-SCqob-CQTs-Rq.png" alt="" />
          </div>
          <div className="item" style={{ "--position": 2 }}>
            <img src="https://i.ibb.co/VpvYPXmM/file-Qb-WLou8j-Ui5-SCqob-CQTs-Rq.png" alt="" />
          </div>
          <div className="item" style={{ "--position": 3 }}>
            <img src="https://i.ibb.co/VpvYPXmM/file-Qb-WLou8j-Ui5-SCqob-CQTs-Rq.png" alt="" />
          </div>
          <div className="item" style={{ "--position": 4 }}>
            <img src="https://i.ibb.co/VpvYPXmM/file-Qb-WLou8j-Ui5-SCqob-CQTs-Rq.png" alt="" />
          </div>
          <div className="item" style={{ "--position": 5 }}>
            <img src="https://i.ibb.co/VpvYPXmM/file-Qb-WLou8j-Ui5-SCqob-CQTs-Rq.png" alt="" />
          </div>
          <div className="item" style={{ "--position": 6 }}>
            <img src="https://i.ibb.co/VpvYPXmM/file-Qb-WLou8j-Ui5-SCqob-CQTs-Rq.png" alt="" />
          </div>
          <div className="item" style={{ "--position": 7 }}>
            <img src="https://i.ibb.co/VpvYPXmM/file-Qb-WLou8j-Ui5-SCqob-CQTs-Rq.png" alt="" />
          </div>
          <div className="item" style={{ "--position": 8 }}>
            <img src="../images/slider2_8.png" alt="" />
          </div>
          <div className="item" style={{ "--position": 9 }}>
            <img src="../images/slider2_9.png" alt="" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Slider;
