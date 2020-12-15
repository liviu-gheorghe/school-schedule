import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Table
} from 'react-bootstrap';
import {getStringifedDate } from '../datetime-utils/time';
import LectureModal from './LectureModal';


interface ScheduleTableProps {
    school_days?:any,
    lecturesMatrix?:any
}
const ScheduleTable: React.FC<ScheduleTableProps> = (props) => {

    console.log("Rendering ScheduleTable");

    const [lectureModalShow, setLectureModalShow] = React.useState(false);
    const [currentSelectedLecture, setCurrentSelectedLecture] = React.useState(null);
    const [currentHoveredLectureId, setCurrentHoveredLectureId] = React.useState(null);
    const [currentDate, setCurrentDate] = React.useState(new Date());
    const maxLecturesPerDay = React.useRef<number>(0);
    const currentLecturePlatform = React.useRef<object>({});

    React.useEffect(()=> {
        let d = new Date();
        setCurrentDate(d);
        const x = 60 - d.getSeconds();
        let interval: any = null;
        console.log("date set,setting interval in " + x + " seconds");
        setTimeout(() => {
            let d = new Date();
            setCurrentDate(d);
            interval = setInterval(() => {
                let d = new Date();
                setCurrentDate(d);
                console.log("Updating date");
            }, 60 * 1000);
        }, x);

        return () => {
            clearInterval(interval);
        }
    },[]);

    React.useEffect(() => {

        maxLecturesPerDay.current = props.school_days.map((day:any)=>day.lectures).reduce((acc:number, current:Array<object>) => Math.max(acc, current.length), 0);
    }, [props.school_days]);

    const onLectureCellMouseEnter = (lecture_id:string|any) => {
        setCurrentHoveredLectureId(lecture_id);
    }

    const onLectureCellMouseLeave = () => {
        setCurrentHoveredLectureId(null);
    }
/* 
    const generateTableCells = () => {
        let max = maxLecturesPerDay.current;
        
    } */

    return (
        <>
            <Table bordered responsive className="w-auto mx-auto my-3 Schedule-table">
                <thead>
                    <tr>
                        {
                            props.school_days.map((day:any, idx:number) => {
                                return (
                                    <th
                                        key={idx}
                                        className={`py-3 px-4 text-center ${(currentDate.getDay() === idx + 1) ? "Current-day" : ""}`}
                                        style={{
                                            "verticalAlign": "middle"
                                        }}
                                    >

                                        <div className="h-100 d-flex flex-column">
                                            {day["day_name"]}
                                            {
                                                (currentDate.getDay() === idx + 1) ? (
                                                    <>
                                                        <span className="Time-indicator">
                                                            <FontAwesomeIcon className="mx-1" icon="clock" />
                                                            {getStringifedDate(currentDate)}
                                                        </span>
                                                    </>
                                                ) : (
                                                        <></>
                                                    )
                                            }
                                        </div>
                                    </th>
                                );
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        [...Array(maxLecturesPerDay.current).keys()].map((i:number) => {
                            return (
                                <tr key={i}>
                                    {
                                        props.school_days.map((sd:any)=>sd.lectures).map((col:Array<any>) => col[i]).map((lecture:any,j:number) => {
                                            return (
                                                <ScheduleTableCell
                                                    lecture={lecture}
                                                    key={j}
                                                    subjectHovered={((lecture.subject.id === currentHoveredLectureId))}
                                                    onClick={
                                                        () => {
                                                            setCurrentSelectedLecture(lecture.subject);
                                                            currentLecturePlatform.current = lecture.subject.platform;
                                                            setLectureModalShow(true);
                                                        }
                                                    }
                                                    onHover={
                                                        onLectureCellMouseEnter
                                                    }
                                                    onMouseLeave={
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
                show={lectureModalShow}
                onHide={() => { setLectureModalShow(false) }}
                lecture={currentSelectedLecture}
                platform={currentLecturePlatform.current}
            />
        </>
    );
}



interface ScheduleTableCellProps {
    subject?:any,
    lecture?:any,
    subjectHovered?:boolean,
    onHover:(id:string) => void,
    onMouseLeave:() => void
    onClick:() => void
}

const ScheduleTableCell: React.FC<ScheduleTableCellProps> = (props) => {
    console.log("Rendering ScheduleTableCell");
    let lecture = props.lecture;

    return (
        <td
            className="text-center px-4 py-3 Schedule-table-cell"
            style={{
                "backgroundColor": props.subjectHovered ? "#ededed" : "inherit"
            }}
            onMouseOver={
                () => {
                    props.onHover(lecture.subject["id"]);
                }
            }
            onMouseLeave={
                () => {
                    props.onMouseLeave()
                }
            }
            onClick={props.onClick}
        >
            {lecture.subject.subject_name}
            <br />
            <span style={{ "fontSize": "12px" }}>
                {lecture.start_time} - {lecture.end_time}
            </span>
        </td>
    );
}


export default ScheduleTable;