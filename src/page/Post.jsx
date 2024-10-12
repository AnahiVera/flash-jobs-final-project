import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../context/GlobalContext";
import { FaRegStar, FaStar } from "react-icons/fa";

const Post = () => {
    const { actions } = useContext(Context);
    const [loading, setLoading] = useState(true);
    // esta información la guardaré aquí porque solo es accesible desde esta vista, no necesita estar en el store global
    const [post, setPost] = useState({})
    const [user, setUser] = useState({})
    const params = useParams();

    //tests
    const date = new Date();
    const localDate = date.toLocaleDateString();
    const defaultPost = {
        applications: ['user 1', 'user 2', 'user 3', 'user 4', 'user 5', 'user 6', 'user7'],
    };

    const defaultUser = {
        username: 'John Doe',
        rating: 4,
        jobs_posted: 10
    }

    const listInformation = (list) => {
        let toString = '';
        for (let i in list) {
            if (i == (list.length - 1)) {
                toString += ` ${list[i]}.`
            } else {
                toString += ` ${list[i]},`
            }
        }
        return toString;
    }

    const displayRating = (rating, index) => {
        return index < rating ? < FaStar key={index} /> : <FaRegStar key={index} />
    }

    const displayApplications = (list) => {
        let toString = '';
        for (let i in list) {
            if (list.length == 0) {
                toString += 'No one has applied for this offer'
            } else if (list.length == 1) {
                toString += `Just ${list[i]} has applied for this offer`;
            } else if (i > 2) {
                toString += `and ${list.length - i} more have applied for this offer`;
                break;
            } else {
                toString += `${list[i]}, `;
            }
        }
        return toString;
    }

    const dateConverter = (stringDate) => {
        const date = new Date(stringDate);
        const formated = date.toLocaleDateString();
        return formated;
    }

    async function getPostInfo() { //función asicrona
        //guardo el resultado del GET en una variable interna (deben modificar los actions que necesiten utilizar de igual forma para que retornen los datos que necesiten)
        const post = await actions.getJobPost(params.id, sessionStorage.access_token)
        //realizo la segunda consulta que solo se hará al completar la anterior, entonces así me aseguro que tiene los datos que le pasaré como parámetro, en este caso el user_id
        const user = await actions.getUserByid(post.employer, sessionStorage.access_token)
        // utilizo await nombre_de_la_variable para que obtenga un verdadero y así validarlo para ejecutar los setPost, setuUser y setLoading que creé al principio de este código
        await post && setPost(post)
        await user && setUser(user)
        await user && setLoading(false)
    }

    const UserCard = () => (
        <div className="col-12 col-lg-4">
            <div className="card">
                <img src="..." className="card-img-top" alt="user avatar" />
                <div className="card-body">
                    <h5 className="card-title">{user.username}</h5>
                    <p className="card-text"><b>Rating: </b>{[...new Array(5)].map((_, i) => displayRating(defaultUser.rating, i))}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Published Jobs: </b>{defaultUser.jobs_posted}</li>
                </ul>
            </div>
        </div>
    )

    const PostCard = () => (
        <div className="col-12 col-lg-8">
            <div className="card" >
                <div className="card-header">
                    <h5 className="card-title">{post.title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{dateConverter(post.date)}</h6>
                    <h6 className="card-subtitle mb-2 text-body-secondary"><b>{displayApplications(defaultPost.applications)}</b></h6>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Tech Knowledges:</b>{listInformation(post.technologies)}</li>
                    <li className="list-group-item"><b>Languages:</b>{listInformation(post.languages)}</li>
                    <li className="list-group-item"><b>Required Time: </b>{post.required_time} days</li>
                    <li className="list-group-item"><b>Payment: </b>${post.payment}</li>
                </ul>
                <div className="card-body">
                    <p className="card-text">{post.description}</p>
                    <Link to="/post/1/apply" className="btn btn-primary text-white">Apply</Link>
                </div>
            </div>
        </div>
    )

    useEffect(() => {
        getPostInfo()
    }, [])

    return (
        <div className="container-fluid mt-5 py-4">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="row g-3">
                    {<UserCard />}
                    {<PostCard />}
                </div>
            )}
        </div>
    );
}

export default Post;