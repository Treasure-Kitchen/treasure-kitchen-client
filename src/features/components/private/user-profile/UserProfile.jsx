import React from "react";
import { Card, Col, Container, Image, ListGroup, Row, Spinner } from "react-bootstrap";
import { DUMMY_USER_PHOTO } from "../../../../settings/settings";
import { useGetProfileQuery } from "../../../api/userApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaList, FaMapMarkerAlt, FaPlusSquare } from "react-icons/fa";
import Danger from "../../public/common/toasts/Danger";
import { useGetUserOrdersQuery } from "../../../api/orderApi";

const UserProfile = () => {
	const { user } = useSelector((state) => state.auth);
	const {
		data: profile,
		isError,
		isLoading
	} = useGetProfileQuery(user?.user?.id);

	const qString = `?page=1&perPage=2`;
	const { data: orders } = useGetUserOrdersQuery(qString);
	console.log(orders)
	const profilePhoto = profile?.photo ? profile.photo : DUMMY_USER_PHOTO;

	return (
		<Container fluid className="PaddingTop">
			<Row>
			<Row
				className="p-0 m-auto mb-5">
				{ isLoading ? 
					<>
						<span className="d-flex justify-content-center align-items-center"><Spinner variant="light"/></span>
					</> :
				  (isError) ?
				  	<div className="d-flex justify-content-center align-items-center">
						<Danger message={<p>There was an error getting your profile details. Please <Link className="fw-bold" to='/contact'>contact</Link> Treasure Kitchen if the error persists.</p>}/>
					</div> :
					<>
						<Col className="" sm={12} md={6}>
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
										<span className="fw-bold"><FaMapMarkerAlt /></span>{" "}
										{ profile?.address ?
											<>
												<span className="text-muted">{profile?.address?.locality}, {profile?.address?.country}.</span>
												<Link to={`/address/${profile?.address?._id}/edit`} style={{float: 'right'}}>
													<FaEdit color="#583010" size={20} />
												</Link>
											</> : 
											<Link to='/address/add' style={{ float: 'right' }}>Add Address</Link>
										}
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
										<Link to="/orders/create">
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
									{ orders?.Data.length > 0 ?
										orders?.Data.map(order => (
											<ListGroup.Item>
												{order?.dishes.length} dish(es) | ₦{order?.price} | {order?.status} | <FaEye color="#583010" size={15}/>
											</ListGroup.Item>
										)) :
										<>
											<span className="text-muted text-center text-italic m-auto py-2">You have no order</span>
										</>
									}
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
			</Row>
		</Container>
	);
};

export default UserProfile;
