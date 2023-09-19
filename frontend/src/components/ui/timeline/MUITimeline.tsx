import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from '@mui/lab'
import { FC } from 'react';



interface IEvent {
  name: string;
  time: string;
  Icon?: any;
}


interface IMUITimeLineProps {
  data?: IEvent[];
}

const MUITimeline: FC<IMUITimeLineProps> = (props) => {

  const {
    data
  } = props;

  return (
    <>
      {data && (
        <Timeline position='alternate'>
          {data.map((item, index) => (
            <TimelineItem>
              <TimelineOppositeContent>{item.time}</TimelineOppositeContent>
              <TimelineSeparator>
                {!item.Icon && <TimelineDot variant='outlined' />}
                {item.Icon && item.Icon}
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>{item.name}</TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      )}

      {!data && (
        <Timeline position='alternate'>
          <TimelineItem>
            <TimelineOppositeContent>10:00 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot variant='outlined' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              Event 1
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineOppositeContent>10:00 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              Event 2
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineOppositeContent>10:00 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              Event 3
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      )}
    </>
  )
}

export default MUITimeline