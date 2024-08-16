import React, { useEffect, useState, useRef } from "react";
import Cancion from "./cancion"

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
let i = 0;

const Home = () => {
	const [music, setMusic] = useState([])
	const [loop, setLoop] = useState(false)
	const [cancionActual, setCancionActual] = useState("")
	const audioRef = useRef("");


	useEffect(() => {
		ObtenerCanciones();
		
	}, [])

	useEffect(() => {
		console.log('Cancion Actual:', cancionActual);
	}, [cancionActual]);


	const ObtenerCanciones = () =>{

		fetch("https://playground.4geeks.com/sound/songs", {
			method: "GET"
		})

		.then((response) => response.json())
		.then((data) => {
			 setMusic(data.songs)
			 return console.log(data)})
		.catch((error) => console.log(error))

	}

	const Play = () => {
		i++;
		if(i % 2 !== 0)
		{
			audioRef.current.src = `https://playground.4geeks.com${cancionActual.url}`;
			audioRef.current.play();
		}
		else
		audioRef.current.pause();
	}

	const Siguiente = () => {
		if(audioRef.current.src == "")
		{
			return;
		}
		else
		{
			let actual = (cancionActual.id)
			if(actual >= 19)
			{
				actual = 0
				console.log(actual)
				setCancionActual(music[actual])
				audioRef.current.load();	
				audioRef.current.src = `https://playground.4geeks.com${music[actual].url}`;
				audioRef.current.play();
				i = 3;
			}else
			{
				setCancionActual(music[actual])
				audioRef.current.load();	
				audioRef.current.src = `https://playground.4geeks.com${music[actual].url}`;
				audioRef.current.play();
				i = 3;
			}

		}
	}

	const Anterior = () => {
		if(audioRef.current.src == "")
		{
			return;
		}
		else
		{
			let actual = (cancionActual.id - 2)
			console.log(actual)
			if(actual < 0)
			{
				actual = music.length-1
				console.log(actual)
				setCancionActual(music[actual])
				audioRef.current.load();	
				audioRef.current.src = `https://playground.4geeks.com${music[actual].url}`;
				audioRef.current.play();
				i = 3;
			}else
			{
				setCancionActual(music[actual])
				audioRef.current.load();	
				audioRef.current.src = `https://playground.4geeks.com${music[actual].url}`;
				audioRef.current.play();
				i = 3;
			}
		}
	}

	const Repetir = () => {
		
		setLoop(!loop);
		console.log(loop)
        audioRef.current.loop = !loop;
	}

	const Aleatorio = () => {
		let num = Math.floor(Math.random() * music.length)
		console.log(num);
		setCancionActual(music[num]);
		audioRef.current.load();
		audioRef.current.src = `https://playground.4geeks.com${music[num].url}`
		audioRef.current.play();
	}

	const MenosVolumen = () => {
		audioRef.current.volume = Math.max(audioRef.current.volume-0.10, 0.0);
	}
	const MasVolumen = () => {
		audioRef.current.volume = Math.min(audioRef.current.volume + 0.20, 1.0);
	}



	return (
		<div className="w-auto h-100 bg-black p-3 fs-3">
			<div className="d-flex p-3 w-100">
				<div className="list-group list-group-numbered w-100">
					{music.map((cancion, index) =>(
						<Cancion cancionNombre={cancion.name} key={cancion.id} onClick={() => setCancionActual(cancion)} seleccionado={cancion === cancionActual}/>
					))}

				</div>
			</div>
			<div className="bg-dark w-auto h-100 m-2 d-flex justify-content-center rounded" style={{border: `2px solid "#32c01f"`}} onClick={MenosVolumen}>
				<i type="button" className="fa-solid fa-minus py-4 pe-3" style={{color: "#ffffff", fontSize: "25px"}}></i>
				<i type="button" className="fa-solid fa-shuffle py-4 pe-3" style={{color: "#ffffff", fontSize: "25px"}} onClick={Aleatorio}></i>
				<i type="button" className="fa-solid fa-backward-step p-3" style={{color: "#ffffff", fontSize: "35px"}} onClick={Anterior}></i> 
				<i type="button" className="fa-solid fa-play p-3" style={{color: "#ffffff", fontSize: "35px"}} onClick={Play}></i> 
				<i type="button" className="fa-solid fa-forward-step p-3" style={{color: "#ffffff", fontSize: "35px"}} onClick={Siguiente}></i>
				<i type="button" className="fa-solid fa-repeat py-4 ps-3" style={{color: `${loop ? "#32c01f" : "#ffffff"}`, fontSize: "25px"}} onClick={Repetir}></i>
				<i type="button" className="fa-solid fa-plus py-4 ps-3" style={{color: "#ffffff", fontSize: "25px"}} onClick={MasVolumen}></i>
			</div>
			<audio ref={audioRef}/>
		</div>
	);
};

export default Home;
