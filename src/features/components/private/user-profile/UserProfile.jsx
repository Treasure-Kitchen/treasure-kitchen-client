import React from "react";
import { Col, Container, ListGroup, Row, Spinner, Toast } from "react-bootstrap";
import { useGetProfileQuery } from "../../../api/userApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaEnvelope, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { BsCalendar2DateFill, BsCartCheckFill } from 'react-icons/bs';
import { useGetUserHasOrdersQuery } from "../../../api/orderApi";
import { useHasReservationQuery } from "../../../api/reservationApi";

const UserProfile = () => {
	const { user } = useSelector((state) => state.auth);
	const {
		data: profile,
		isError,
		isLoading
	} = useGetProfileQuery(user?.user?.id);

	const { data: hasOrders, isLoading: isOrdersLoading } = useGetUserHasOrdersQuery();
	const { data: hasReservation, isLoading: isReservationLoading } = useHasReservationQuery();

	return (
		<Container fluid className="PaddingTop">
			<Row className="p-0 m-0 mt-5 mb-5 d-flex justify-content-center align-items-center">
				{
					isLoading || isOrdersLoading || isReservationLoading ?
						<Spinner /> :
					isError ?
						<Toast className='m-auto' bg='danger'>
                            <Toast.Body className='text-white'>
                                <p>An error occurred fetching details. Please refresh. <Link to='/contact' className='fw-bold'>Contact Treasure Kitchen</Link> if issue persists.</p>
                            </Toast.Body>
                        </Toast> :
					<>
						<Col sm={0} md={2} lg={3} className="m-0 p-0"></Col>
						<Col sm={12} md={8} lg={6} className="forms m-0 p-0 pb-3" style={{minHeight: '20vh'}}>
							<Row className="w-100 m-0 p-0">
								<Col sm={12} md={5} lg={4} className="m-0 p-0 border-bottom">
									<h1 className="text-center bigSingleLetter m-auto my-2">{profile?.displayName[0]}</h1>
								</Col>
								<Col sm={12} md={7} lg={8} className="m-0 p-0 border-bottom">
									<div className="p-2 names border-bottom">
										<FaUser /> 
										<span className="px-1">{profile?.displayName}</span>
										<Link to="update-name" className="FloatRight DarkGreen">Edit</Link>
									</div>
									<div className="p-2 names border-bottom">
										<FaEnvelope /> 
										<span className="px-1">{profile?.email}</span>
									</div>
									<div>
										<Link to="change-password" className="FloatRight DarkGreen p-2">Change Password</Link>
									</div>
								</Col>
							</Row>
							<Row className="w-100 m-0 p-0">
								<ListGroup className="w-100 m-0 p-0">
									{ profile?.address ?
										<div className="p-2 names">
											<FaMapMarkerAlt />
											<span className="px-1">{profile?.address?.locality}, {profile?.address?.country}.</span>
											<Link to={`/address/${profile?.address?._id}/edit`} className="FloatRight DarkGreen" state={profile?.address}>Edit</Link>
										</div> : 
										<Link to='/address/add' style={{ float: 'right' }}>Add Address</Link>
									}
								</ListGroup>
							</Row>
							<Row className="w-100 m-0 p-0 names border-top">
								<Col sm={12} md={6} className="m-0 mb-3">
									<BsCartCheckFill size={18}/>
									<span>
										{
											hasOrders ?
											<Link to='/my-orders' className="DarkGreen FloatRight">My Orders</Link> :
											<Link to={`/orders/add`} className="DarkGreen FloatRight">Shop</Link>
										}
									</span>
								</Col>
								<Col sm={12} md={6} className="m-0 mb-3">
									<BsCalendar2DateFill  size={18}/>
									<span>
										{
											hasReservation ?
											<Link to={`/my-reservations`} className="DarkGreen FloatRight">My Reservations</Link> :
											<Link to={`/reservations/add`} className="DarkGreen FloatRight">Add Reservation</Link>
										}
									</span>
								</Col>
							</Row>
						</Col>
						<Col sm={0} md={2} lg={3} className="m-0 p-0"></Col>
					</>
				}
      		</Row>
		</Container>
	);
};

export default UserProfile;
