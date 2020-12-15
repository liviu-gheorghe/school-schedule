import * as React from 'react';
import {
    Container,
    Row,
    Col,
    Image,
    Modal,
    Button
} from 'react-bootstrap';


const LectureModal = (props:any) => {

    console.log("Rendering LectureImagePanel");
    let lecture = props.lecture || {};
    let platform = props.platform || {};

    let [imagePanelOpen, setImagePanelOpen] = React.useState(false);
    let [showImage, setShowImage] = React.useState(true);

    const openConferenceInNewTab = (url:any) => {
        window.open(url);
    }

    React.useEffect(() => {

/*     setTimeout(() => {
                setShowImage(true);
            }, 5000); */

        return () => {
            console.log("LectureModal unmount");
        }

    }, []);



    return (
        <Modal
            className="No-select"
            show={props.show}
            onHide={() => {
                props.onHide();
                setImagePanelOpen(false);
            }}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Container
                style={{
                    "minHeight": "500px"
                }}
                fluid
            >
                <Row style={{
                    "minHeight": "500px"
                }}>
                    <Col xs={8} className="d-flex align-items-center justify-content-center p-0 Lecture-image-container">
                        {
                                <Image
                                    style={{
                                        "height": "500px",
                                        "objectFit": "cover"
                                    }}
                                    src={lecture.img || ''}
                                className={`Lecture-image ${(showImage === true)? "" : "transparent"}`}
                                />
                        }
                        <div style={{
                            "position": "absolute",
                            "top": "0px",
                            "right": "0px",
                            "visibility": (imagePanelOpen === true ? "hidden" : "visible")
                        }}>
                            {/*<Button
                            variant="outline-primary"
                            onClick = {() => {
                                setImagePanelOpen(true);
                            }}
                            > <FontAwesomeIcon size="lg" icon="ellipsis-v" /></Button> */
                            }
                        </div>
                        <LectureImagePanel open={imagePanelOpen} />
                    </Col>
                    <Col xs={4} className="align-items-center justify-content-center d-flex flex-column">
                        <Modal.Header
                            closeButton
                            style={{
                                "position": "absolute",
                                "right": "0",
                                "top": "0px",
                                "border": "none"
                            }}
                        >
                            <Modal.Title id="contained-modal-title-vcenter">
                            </Modal.Title>
                        </Modal.Header>
                        <>
                            <h3 className="text-center">{lecture.subject_name}</h3>
                            <p>Prof. {lecture.teacher}</p>
                            <div className="text-center">
                                <Image
                                    style={{
                                        "cursor": "pointer"
                                    }}
                                    src={platform.logo}
                                    width="75px"
                                    className="m-4"
                                    onClick={
                                        () => openConferenceInNewTab(lecture.link)
                                    }
                                />
                            </div>
                        </>
                        <div className="text-center">
                            <p style={{ "fontSize": "20px" }} className="text-dark">via {platform.name}</p>
                        </div>
                        <div className="text-center">
                            <Button
                                variant="success"
                                onClick={
                                    () => openConferenceInNewTab(lecture.link)
                                }
                            >
                                Participa la curs
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>

        </Modal>
    );
}

const LectureImagePanel = (props: any) => {

    console.log("Rendering LectureImagePanel");

    const panelOpenClass = props.open ? "Lecture-image-panel-open" : "";
    return (
        <div className={`Lecture-image-panel text-white ${panelOpenClass}`}>
            <p>Lorem ipsum dolor sit amet</p>
            <Button>OK</Button>
        </div>
    );
}

export default LectureModal;
