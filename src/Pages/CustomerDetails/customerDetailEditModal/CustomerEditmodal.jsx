import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CustomerEditmodal({ closeAllbuttons, reloadCustomerData, reloadTable, customerData, closemodal }) {
    let navigate = useNavigate();
    let baseUrl = process.env.REACT_APP_BASE_URL;
    try {
        customerData = customerData[0];
    } catch (error) {

    };

    const [customerNote,
        setcustomerNote] = useState("");
    const [token,
        setToken] = useState("");
    const [address,
        setAddress] = useState("");
    const [Email,
        setEmail] = useState("");
    const [Name,
        setName] = useState("");
    const [Phone,
        setPhone] = useState("");
    const [altPhone,
        setaltPhone] = useState("");
    const [show,
        setshow] = useState(false);
    const [vatno,
        setvatno] = useState("");
    const [customerType,
        setcustomerType] = useState("");
    const [country,
        setcountry] = useState("");
    useEffect(() => {
        let tokenCheck = localStorage.getItem("tokens");
        if (!tokenCheck) {
            navigate('/')
        } else {
            setToken(localStorage.getItem("tokens"))
        }
    }, [])
    useEffect(() => {
        if (customerData) {
            setshow(true);
            setAddress(customerData
                ?.Address || "");
            setEmail(customerData
                ?.Email || "");
            setName(customerData
                ?.Name || "");
            setPhone(customerData
                ?.Phone || "");
            setaltPhone(customerData
                ?.altPhone || "");
            setvatno(customerData
                ?.vat || "");
            setcustomerType(customerData
                ?.type || "");
            setcountry(customerData
                ?.country || "");
            setcustomerNote(customerData
                ?.customerNote || "");
        }
    }, []);
    const changeName = (e) => {
        setshowupdateButton(false);
        setName(e.target.value);
        setshowupdateButton(true);

    };
    const changeNote = (e) => {
        setshowupdateButton(false);
        setcustomerNote(e.target.value);
        setshowupdateButton(true);
    }
    const changePhone = (e) => {
        setshowupdateButton(false);
        setPhone(e.target.value);
        setshowupdateButton(true);

    };
    const changeEmail = (e) => {
        setshowupdateButton(false);
        setEmail(e.target.value);
        setshowupdateButton(true);

    };
    const changeaddress = (e) => {
        setshowupdateButton(false);
        setAddress(e.target.value);
        setshowupdateButton(true);

    };
    const changealtPhone = (e) => {
        setshowupdateButton(false);
        setaltPhone(e.target.value);
        setshowupdateButton(true);

    };
    const changetype = (e) => {
        setshowupdateButton(false);
        setcustomerType(e.target.value);
        setshowupdateButton(true);
    };
    const changevat = (e) => {
        setshowupdateButton(false);
        setvatno(e.target.value);
        setshowupdateButton(true);
    };
    const changecountry = (e) => {
        setshowupdateButton(false);
        setcountry(e.target.value);
        setshowupdateButton(true);
    }
    const [showupdateButton,
        setshowupdateButton] = useState(false);
    const updateUserData = async () => {
        console.log(customerNote)
        axios
            .post(`${baseUrl}/customerDetailsUpdate`, {
                cardno: "",
                customerNote: `${customerNote}`,
                altPhone: `${altPhone}`,
                vatno: `${vatno}`,
                type: `${customerType}`,
                Country: `${country}`,
                Address: `${address}`,
                Phone: `${Phone}`,
                Email: `${Email}`,
                token: `${token}`,
                customerID: `${customerData.customerID}`
            })
            .then(async (response) => {
                await reloadCustomerData(Name)
                await reloadTable(customerData.customerID)
                closeAllbuttons();
            })
            .catch((error) => {
                console.log(error)
            })

    }

    const changeShow = () => {
        setshow(false);
        closeAllbuttons();
        return;
    }
    return (
        <Modal
            show={show}
            onHide={changeShow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update the information.
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3 customer-edit-fileds" controlId="exampleForm.ControlInput1">
                        <Form.Label>Name :</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={Name}
                            defaultValue={Name}
                            onChange={changeName}
                            autoFocus />
                        <Form.Label>Phone :</Form.Label>
                        <Form.Control
                            type="phone"
                            placeholder={Phone}
                            defaultValue={Phone}
                            onChange={changePhone}
                            autoFocus />
                        <Form.Label>Email :</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder={Email}
                            defaultValue={Email}
                            onChange={changeEmail}
                            autoFocus />
                        <Form.Label>Address :</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={address}
                            defaultValue={address}
                            onChange={changeaddress}
                            autoFocus />
                        <Form.Label>Alternate phone number :</Form.Label>
                        <Form.Control
                            type="phone"
                            placeholder={altPhone}
                            defaultValue={altPhone}
                            onChange={changealtPhone}
                            autoFocus />
                        <Form.Label>Type :</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={customerType}
                            defaultValue={customerType}
                            onChange={changetype}
                            autoFocus />
                        <Form.Label>Vat No :</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={vatno}
                            defaultValue={vatno}
                            onChange={changevat}
                            autoFocus />
                        <Form.Label>Country :</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={country}
                            defaultValue={country}
                            onChange={changecountry}
                            autoFocus />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Add User Note :
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder={customerNote}
                            defaultValue={customerNote}
                            onChange={changeNote}
                            autoFocus />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {showupdateButton &&
                    <Button onClick={
                        updateUserData
                    }
                    className='btn-update-info'> Update </Button>}
                <Button
                    type="button"
                    className="btn-close-update"
                    data-dismiss="modal"
                    onClick={changeShow}>Close</Button>
            </Modal.Footer>
        </Modal>

    )
}

export default CustomerEditmodal