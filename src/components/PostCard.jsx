import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Context } from "../context/GlobalContext";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import imgPrf from'../page/img/avatarDefault.png'


const PostCard = ({ datos, data }) => {
    const { store, actions } = useContext(Context)
    const [user, setUser] = useState({})

    const location = useLocation()

    const EditsIcon = ({ datos }) => (
        <div className="ms-auto">
            <Link to={`/jobform/${datos.id}`}>
                <FaPencilAlt className="me-3" />
            </Link>
            <FaTrash />
        </div>
    )

    async function getPostInfo() {
        const user = await actions.getUserByid(datos.employer)
        setUser(user)
    }

    useEffect(() => {
        getPostInfo()
    }, [])

    return (
        <div className={(location.pathname == "/") ? "col-12 col-md-6" : "container-fluid"}>
            <div className="card p-2 mb-2">
                <div className="d-flex ">
                    <img src={user?.profile?.avatar || imgPrf } className="rounded-circle profile-avatar" alt="avatar" />
                    <div className="ms-3 w-100">
                        <Link className='link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-50-hover' to={`/post/${datos.id}`}>{datos.title}</Link>
                        <div className="text-muted">
                            {datos.description}
                        </div>
                        <div className="text-muted">
                            {`$ ${datos.payment}`}
                        </div>
                        <div className="text ">
                            {datos.languages.join(", ")}
                        </div>
                        <div className="text-muted">
                            {datos.technologies.join(", ")}
                        </div>
                    </div>
                    {location.pathname != '/' && <EditsIcon datos={data} />}
                </div>
               {(location.pathname != "/") &&  <button type="button" className="btn btn-dark m-1">Ver applicantes</button>}
            </div>
        </div>
    )
}

export default PostCard;