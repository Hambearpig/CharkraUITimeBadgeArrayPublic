import { Button } from "@chakra-ui/react";

const TimeBagde = ({
  time,
  selected,
  active,
  selectBookingTime,
  ...timeBadgeProps
}) => {
  const handleSelect = () => {
    selectBookingTime(time);
  };

  return (
    <Button
      id={time}
      size="xs"
      w={"100%"}
      _hover={{ transform: "scale(1.1)" }}
      variant={selected ? "solid" : "outline"}
      disabled={!active}
      onClick={handleSelect}
      {...timeBadgeProps}
    >
      {time}
    </Button>
  );
};

export default TimeBagde;
