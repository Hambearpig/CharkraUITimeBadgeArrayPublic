import { useState, useEffect } from "react";
import { Grid, GridItem, Box } from "@chakra-ui/react";
import TimeBagde from "./TimeBagde";
import moment from "moment";

const TimeGrid = ({
  allTimes,
  availableTimes = allTimes,
  defaultSelected = false,
  endTime = false,
  onChange = (times) => {},
  timeGridStyles,
  timeBadgeStyles,
}) => {
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [times, setTimes] = useState({
    startTime: false,
    endTime: false,
  });
  useEffect(() => {
    if (defaultSelected) {
      setSelectedTimes(defaultSelected);
      if (!endTime) {
        setTimes({ startTime: defaultSelected.at(0, 1) });
      } else {
        setTimes({
          startTime: defaultSelected.at(0, 1),
          endTime: defaultSelected.at(-1),
        });
      }
    }
  }, []);

  useEffect(() => {
    if (times.startTime) {
      onChange(times);
    }
  }, [times]);

  const selectOneBookingTime = (time) => {
    setSelectedTimes([time]);
    setTimes({ startTime: time });
  };

  const selectTwoBookingTimes = (time) => {
    if (selectedTimes.length === 0) {
      setSelectedTimes([time]);
      setTimes({ ...times, startTime: time });
    } else if (selectedTimes.length === 1) {
      if (moment(time, "HH:mm:ss") <= moment(selectedTimes[0], "HH:mm:ss")) {
        setSelectedTimes([time]);
        setTimes({ startTime: time, endTime: false });
      } else {
        if (
          allTimes.slice(
            allTimes.indexOf(selectedTimes[0]),
            allTimes.indexOf(time)
          ).length ===
          availableTimes.slice(
            availableTimes.indexOf(selectedTimes[0]),
            availableTimes.indexOf(time)
          ).length
        ) {
          setSelectedTimes([
            ...allTimes.slice(
              allTimes.indexOf(selectedTimes[0]),
              allTimes.indexOf(time) + 1
            ),
            setTimes({ ...times, endTime: time }),
          ]);
        } else {
          setSelectedTimes([time]);
          setTimes({ startTime: time, endTime: false });
        }
      }
    } else {
      setSelectedTimes([time]);
      setTimes({ startTime: time, endTime: false });
    }
  };
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={2} {...timeGridStyles}>
      {allTimes.map((time) => (
        <GridItem key={time}>
          <TimeBagde
            time={time}
            active={availableTimes.includes(time)}
            selectBookingTime={
              endTime ? selectTwoBookingTimes : selectOneBookingTime
            }
            selected={selectedTimes.includes(time)}
            {...timeBadgeStyles}
          />
        </GridItem>
      ))}
    </Grid>
  );
};

export default TimeGrid;
