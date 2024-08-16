import React from "react";

const Cancion = (props) => {
    const { cancionNombre, onClick, seleccionado  } = props;
    return (
        <button type="button"
        className={`list-group-item list-group-item-action bg-dark text-light btn btn-outline fs-5 my-1 ${seleccionado ? "active" : ""}`}
            onClick={onClick}
        >
            {cancionNombre}
        </button>
    );
}

export default Cancion;