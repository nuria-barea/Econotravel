import React, { useEffect, useState } from "react"
import { Link, useParams, useLocation } from "react-router-dom"
import { ReadMore } from "../components/Detail/ReadMore.jsx"
import { Breadcrumbs, Buttons, Crumb, FlexColumn, InfoDetail, DetailReser, ImgDetail, ContainerDetail } from "../components/styles/Styles.jsx"
import Getinfo from '../servicios/Getinfo.jsx';

export default function Detail() {
    const {id} = useParams();
    const [singleDetail, setSingleDetail]= useState([id])
    const [loading, setLoading] = useState(false)
    const {etiquetaActiva} = useLocation().state;

    useEffect(()=>{
        setLoading(true)
        Getinfo.getAll()
        .then(res =>{ 
                setSingleDetail(res[id])
                setLoading(false)
            })
    }, [])

    if (loading) return <section>Cargando...</section>

    return(
        <ContainerDetail>
            <Breadcrumbs>
                <Crumb><Link to="/" className="a">Home</Link></Crumb>
                <Crumb><Link to="/search" className="a">Search</Link></Crumb>
                <Crumb><Link to="/search" className="a">{etiquetaActiva}</Link></Crumb>
                <Crumb>{singleDetail.titulo}</Crumb>
            </Breadcrumbs>

            <h1>{singleDetail.titulo}</h1>

            <InfoDetail>
                <FlexColumn>
                    <ImgDetail src={singleDetail.img} alt={singleDetail.titulo}/>
                    <span>{singleDetail.titulo}</span>
                </FlexColumn>

                <ReadMore>
                    <p>
                        <h5>Description:</h5>
                        {singleDetail.descripcion}
                    </p>

                    <p>
                        <h5>Accesibilidad:</h5>
                        {singleDetail.accesibilidad}
                    </p>
                    
                    <p>
                        <h5>Duración:</h5>
                        {singleDetail.duracion}
                    </p>
                </ReadMore>
                   
                <DetailReser>
                    <h2>{singleDetail.precio}</h2>
                    <label for="quantity">
                        Cant:  <input type="number" id="quantity" min="1" max="20"/>
                    </label>
                    <Link to="/search"><Buttons type="submit">Reservar</Buttons></Link>
                </DetailReser>
            </InfoDetail>
        </ContainerDetail>
    )
}