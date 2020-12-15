import * as React from 'react';
import {
    Container,
    Row,
    Col,
    Card
} from 'react-bootstrap';
import './SchedulePage.css';
import Loader from '../components/Loader';
import { TimeRange, extractTimeFromDate} from '../datetime-utils/time';
import ScheduleTable from './ScheduleTable';
const data = require('../data.json');

interface OngoingLectureCardProps {
    currentLectureInfo:any
}

const OngoingLectureCard: React.FC<OngoingLectureCardProps> = (props) => {

    let currentLectureInfo = props.currentLectureInfo;

    if (currentLectureInfo === null)
    return (
        <></>
    );

    return (
        <LectureCard 
            ongoing
            lectureInfo = {currentLectureInfo}
        />
    ); 
}

interface NextLectureCardProps {
    next?:boolean
}

const NextLectureCard: React.FC<NextLectureCardProps> = (props) => {

        return (
            <> </>
        );
}

interface LectureCardProps {
    ongoing?: boolean,
    next?:boolean,
    lectureInfo: any
}

const LectureCard: React.FC<LectureCardProps> = (props) => {
    console.log("Rendering LectureCard");
    let next = props.next === true;
    let ongoing = props.ongoing === true;
    let lectureInfo = props.lectureInfo;
    console.log(lectureInfo);
    let lecture = lectureInfo.lecture;
    let variant = 'success';
    return (
        <Card
            bg={variant}
            text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
            style={{ width: '18rem' }}
            className="mx-auto"
        >
            <Card.Header>{ongoing ? "Ongoing" : "Next"} lecture</Card.Header>
            <Card.Body>
                <Card.Title>{lecture.subject.subject_name}</Card.Title>
                <Card.Text>
                    {lecture.start_time} - {lecture.end_time}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

const SchedulePage:React.FC = () => {

    console.log("Rendering SchedulePage");

    let [dataLoaded, setDataLoaded] = React.useState(false);
    let currentLectureInfo = React.useRef<object | null>(null);

    React.useEffect(() => {
        data.school_days.forEach((day: any) => {
            day.lectures.forEach((lecture: any) => {
                lecture.subject = data.subjects[lecture.subject_index];
            });
        });
    }, []);

    React.useEffect(() => {
        data.subjects.forEach((subject: any) => {
            subject.platform = data.platforms[subject.platform];
        });
        console.log(data.subjects);
    }, []);

    React.useEffect(() => {
        let maxLecturesPerDay:number = 0;
        data.school_days.forEach((day:any) => {
            maxLecturesPerDay = Math.max(maxLecturesPerDay, day["lectures"].length);
        });

        let matrix: Array<number>[] = [];
        for (let i = 0; i < maxLecturesPerDay;i++) matrix[i] = [];
        data.school_days.forEach((day:any,i:number) => {
            day["lectures"].forEach((lecture:any,j:number) => {
                matrix[j][i] = lecture["subject_index"];
            })
        });

        const FETCH_TIMEOUT = 0;
        setTimeout(() => {
            setDataLoaded(true);
        },FETCH_TIMEOUT);
        },[]);

        React.useEffect(()=>{

            const getOngoingLectureInfo = () => {

                let day = getCurrentDay();
                let ongoing_lecture_info: OngoingLectureInfo | null = null;
                if (day > 5) return ongoing_lecture_info;
                data.school_days[day - 1].lectures.forEach((lecture: any, i: number) => {

                    let d = new Date();
                    let lectureTimeRange = TimeRange(lecture.start_time, lecture.end_time);
                    if (lectureTimeRange.contains(extractTimeFromDate(d))) {
                        ongoing_lecture_info = {
                            lecture: lecture,
                            lecturePositionInWeek: [day - 1, i]
                        };
                        return ongoing_lecture_info;
                    }
                });

                return ongoing_lecture_info;
            }

            currentLectureInfo.current = getOngoingLectureInfo();
        }, []);


    const generateTableContent = () => {

        if(dataLoaded === true) return (
            <ScheduleTable school_days={data.school_days} /* lecturesMatrix = {lecturesMatrix.current} */ />
        )
        else return (
            <Loader />
        );
    };

    const getCurrentDay = () => {
        let d = new Date();
        return d.getDay();
    }

    const getNextLecture = (school_days:Array<any>) => {
        let currentDay = getCurrentDay();
        let day = currentDay;
        if (day > 5) {
            return school_days[0].lectures[0];
        }
    }


    interface OngoingLectureInfo {
        lecture:any,
        lecturePositionInWeek:[number,number]
    }


/*     let ongoingLectureInfo:OngoingLectureInfo | null = getOngoingLectureInfo();
    setCurrentLectureInfo(ongoingLectureInfo); */

  return (
      <>
        <Container fluid>
            <Row>
                <Col xs={12} className="align-items-center justify-content-center">
                      <div className="text-center my-2 text-muted" style={{"fontSize":"25px"}}>Liviu's weekly schedule</div> 
                    {
                          generateTableContent()
                    }
                </Col>
            </Row>
            <Row>
                <Col xs={12} className="text-center">
                    <OngoingLectureCard 
                          currentLectureInfo={currentLectureInfo.current}
                    />
                </Col>
            </Row>
        </Container>
      </>

  );
}

export default SchedulePage;
