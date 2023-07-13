import React from "react";
import { Card, Col, Container, Image, ListGroup, Row, Spinner } from "react-bootstrap";
import { DUMMY_USER_PHOTO } from "../../../../settings/settings";
import { useGetProfileQuery } from "../../../api/userApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaEdit, FaList, FaPlusSquare } from "react-icons/fa";
import Danger from "../../public/common/toasts/Danger";

const UserProfile = () => {
	const { user } = useSelector((state) => state.auth);
	const {
		data: profile,
		isError,
		isLoading
	} = useGetProfileQuery(user?.user?.id);
	const registeredOn = new Date(profile?.createdAt).toLocaleDateString();
	const profilePhoto = profile?.photo ? profile.photo : DUMMY_USER_PHOTO;

	return (
		<Container style={{ position: "relative" }} fluid>
			<Row
				className="App"
				style={{
					backgroundImage:
						"url(https://res.cloudinary.com/otrprojs/image/upload/v1687569662/page-common-bg_jiy1g2.jpg)",
				}}
			></Row>
			<Row
				className="p-0"
				style={{
					position: "absolute",
					top: "50%",
					left: "0",
					right: "0",
					margin: "0 1.5rem",
				}}
			>
				{ isLoading ? 
					<>
						<span className="d-flex justify-content-center align-items-center"><Spinner variant="light"/></span>
					</> :
				  (isError) ?
				  	<div className="d-flex justify-content-center align-items-center">
						<Danger message={<p>There was an error getting your profile details. Please <Link className="fw-bold" to='/contact'>contact</Link> Treasure Kitchen if the error persists.</p>}/>
					</div> :
					<>
						<Col className="" sm={12} md={6} style={{ minHeight: "40vh" }}>
							<Card
								bg="light"
								className="BoxShadow my-1"
								style={{ height: "20vh" }}
							>
								<Image
									src={profilePhoto}
									fluid
									thumbnail
									alt="Profile Photo"
									className="h-100 w-50 m-auto"
								/>
							</Card>
							<Card className="BoxShadow my-1" style={{ minHeight: "20vh" }}>
								<ListGroup variant="flush">
									<ListGroup.Item className="bgColor">
										<span className="text-muted">{profile?.displayName}</span>
										<Link to="update-name" style={{ float: "right" }}>
											<FaEdit color="#583010" size={20} />
										</Link>
									</ListGroup.Item>
									<ListGroup.Item className="bgColor">
										<span className="text-muted">{profile?.email}</span>
									</ListGroup.Item>
									<ListGroup.Item className="bgColor">
										<span className="fw-bold">Registered:</span>{" "}
										<span className="text-muted">{registeredOn}</span>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
						<Col className="" sm={12} md={6} style={{ minHeight: "40vh" }}>
							<Card
								bg="light"
								className="BoxShadow my-1"
								style={{ minHeight: "20vh" }}
							>
								<Card.Header
									className="fs-6"
									style={{ display: "flex", justifyContent: "space-between" }}
								>
									<span>Orders </span>
									<span>
										<Link to="">
											<FaPlusSquare color="#583010" size={20} />
										</Link>
									</span>
									<span>
										<Link to="">
											<FaList color="#583010" size={20} />
										</Link>
									</span>
								</Card.Header>
								<ListGroup variant="flush">
									<ListGroup.Item className="bgColor">Order 1</ListGroup.Item>
									<ListGroup.Item className="bgColor">Order 2</ListGroup.Item>
								</ListGroup>
							</Card>
							<Card
								bg="light"
								className="BoxShadow my-1"
								style={{ minHeight: "20vh" }}
							>
								<Card.Header
									className="fs-6"
									style={{ display: "flex", justifyContent: "space-between" }}
								>
									<span>Reservations </span>
									<span>
										<Link to="">
											<FaPlusSquare color="#583010" size={20} />
										</Link>
									</span>
									<span>
										<Link to="">
											<FaList color="#583010" size={20} />
										</Link>
									</span>
								</Card.Header>
								<ListGroup variant="flush">
									<ListGroup.Item className="bgColor">Reservation 1</ListGroup.Item>
									<ListGroup.Item className="bgColor">Reservation 2</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</>
				}
			</Row>
		</Container>
	);
};

export default UserProfile;
