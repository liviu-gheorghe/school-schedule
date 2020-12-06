import React, {useEffect,useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    Container,
    Row,
    Col,
    Table,
    Image,
    Modal,
    Button
} from 'react-bootstrap';
import './App.css';
import Loader from './components/Loader';
const data = require('./data.json');

const LectureModal = (props) => {
    let lecture = props.lecture || {};
    let platform = props.platforms[lecture.platform] || {};

    let [imagePanelOpen,setImagePanelOpen] = useState(false);


    const openConferenceInNewTab = (url) => {
        window.open(url);
    }

    return (
        <Modal
            className="No-select"
            show = {props.show}
            onHide = {() => {
                props.onHide();
                setImagePanelOpen(false);
            }}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Container 
            style={{
                "minHeight": "400px"
            }}
            fluid
            >
                <Row>
                    <Col xs={8} className="d-flex align-items-center justify-content-center p-0 Lecture-image-container">
                        <Image 
                        src={lecture.img || ''} 
                        className="Lecture-image"
                        ></Image>
                        <div style={{
                            "position":"absolute",
                            "top": "0px",
                            "right": "0px",
                            "visibility": (imagePanelOpen === true ? "hidden" : "visible")
                        }}>
{/*                             <Button
                            variant="outline-primary"
                            onClick = {() => {
                                setImagePanelOpen(true);
                            }}
                            > <FontAwesomeIcon size="lg" icon="ellipsis-v" /></Button> */}
                        </div>
                        <LectureImagePanel open = {imagePanelOpen}/>
                    </Col>
                    <Col xs={4} className="align-items-center justify-content-center d-flex flex-column">
                        <Modal.Header
                            closeButton
                            style = {{
                                "position": "absolute",
                                "right": "0",
                                "top" : "0px",
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
                                    style = {{
                                        "cursor": "pointer"
                                    }}
                                    src={platform.logo}
                                    width="100px"
                                    className="m-4"
                                    onClick = {
                                        () => openConferenceInNewTab(lecture.link)
                                    }
                                />
                            </div>
                        </>
                        <div className="text-center">
                            <p style={{"fontSize":"20px"}} className="text-dark">via {platform.name}</p>
                        </div>
                        <div className="text-center">
                            <Button
                                variant="success"
                                onClick = {
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

const LectureImagePanel = (props) => {
    const panelOpenClass = props.open ? "Lecture-image-panel-open" : "";
    return (
        <div className={`Lecture-image-panel text-white ${panelOpenClass}`}>
            <p>Lorem ipsum dolor sit amet</p>
                <Button>OK</Button>
        </div>
    );
}

const ScheduleTable = (props) => {


    const [lectureModalShow, setLectureModalShow] = useState(false);
    const [currentSelectedLecture,setCurrentSelectedLecture] = useState(null);
    const [currentHoveredLectureId,setCurrentHoveredLectureId] = useState(null);
    const [today,setToday] = useState(new Date().getDay());


    useEffect(() => {
        //TODO
    },[]);

    const onLectureCellMouseEnter = (lecture_id) => {
        setCurrentHoveredLectureId(lecture_id);
    }

    const onLectureCellMouseLeave = () => {
        setCurrentHoveredLectureId(null);
    }


    return (
        <>
            <Table bordered responsive className="w-auto mx-auto my-5 Schedule-table">
                <thead>
                <tr>
                    {
                        props.data.school_days.map((day,idx) => {
                            return (
                                <th 
                                    key={idx}
                                    className={`p-4 text-center ${(today === idx + 1) ? "Current-day" : ""}`}
                                >
                                    {day["day_name"]}
                                </th>
                            );
                        })
                    }
                </tr>
                </thead>
                <tbody>
                {
                    props.lecturesMatrix.map((line, i) => {
                        return (
                            <tr key={i}>
                                {
                                    line.map((lecture, j) => {
                                        console.log()
                                        return (
                                            <ScheduleTableCell
                                                subject={props.data["subjects"][lecture]}
                                                key={j}
                                                subjectHovered= {((props.data.subjects[props.lecturesMatrix[i][j]]["id"] === currentHoveredLectureId) )}
                                                className={`text-center px-4 py-3`}
                                                onClick={
                                                    () => {
                                                    setCurrentSelectedLecture(props.data.subjects[props.lecturesMatrix[i][j]]);
                                                    setLectureModalShow(true);
                                                    }
                                                }
                                                onHover = {
                                                    onLectureCellMouseEnter
                                                }
                                                onMouseLeave  = {
                                                    onLectureCellMouseLeave
                                                }
                                            >
                                            </ScheduleTableCell>
                                        );
                                    })
                                }
                            </tr>
                        );
                    })
                }
                </tbody>
            </Table>
            <LectureModal
                show = {lectureModalShow}
                onHide = {() => {setLectureModalShow(false)}}
                lecture = {currentSelectedLecture}
                platforms = {props.data.platforms}
            />
        </>
    );
}

const ScheduleTableCell = (props) => {
    let subject = props.subject;
    return (
        <td
            className={`text-center px-4 py-3 Schedule-table-cell`}
            onMouseOver = {
                () => {
                    props.onHover(subject["id"]);
                }
            }
            onMouseLeave = {
                () => {
                    props.onMouseLeave()
                }
            }
            onClick = {props.onClick}
            >
            {subject["subject_name"]}
        </td>
    );

}

const App = () => {

    let [maxLecturesPerDay,setMaxLecturesPerDay] = useState(0);
    let [lecturesMatrix,setLecturesMatrix] = useState(null);
    let [dataLoaded,setDataLoaded] = useState(false);
    let [currentDate,setCurrentDate] = useState(new Date());

    useEffect(() => {
        /*setInterval(() => {
        setCurrentDate(new Date())
        },1000);*/

        let max = 0;
        data.school_days.forEach(day => {
            max = Math.max(max, day["lectures"].length);
        });
        setMaxLecturesPerDay(max);
        let matrix = [];
        for(let i = 0;i<max;i++) matrix[i] = [];
        data.school_days.forEach((day,i) => {
            day["lectures"].forEach((lecture,j) => {
                matrix[j][i] = lecture["subject_index"];
            })
        });

        const FETCH_TIMEOUT = 0;
        setTimeout(() => {
            setLecturesMatrix(matrix);
            setDataLoaded(true);
        },FETCH_TIMEOUT);


        },[]);

    const generateTableContent = () => {

        if(dataLoaded === true) return (
            <ScheduleTable data={data} lecturesMatrix = {lecturesMatrix} />
        )
        else return (
            <Loader />
        );
    };


/*     const getNextLecture = () => {
        let day = currentDate.getDay();
        let found = false;
        while(found === false) {

            day = (day+1)%6;
        }
    } */

  return (
      <>
        <Container fluid>
            <Row>
                <Col xs={12}>
                    <div>{currentDate.toLocaleString()}</div>
                </Col>
            </Row>
            <Row>
                <Col xs={12} className="align-items-center justify-content-center">
                    {
                        generateTableContent()
                    }
                </Col>
            </Row>
            <Row>
                <Col xs={12} className="text-center">
                    <p className="textCenter">Urmatorul curs</p>
                </Col>
            </Row>
        </Container>
      </>

  );
}

export default App;