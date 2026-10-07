#ifndef OPTICAL_FLOW_H
#define OPTICAL_FLOW_H

#include <Arduino.h>
#include "Bitcraze_PMW3901.h"

#define CS_PIN 5

class OpticalFlowSensor
{
public:

    OpticalFlowSensor();

    bool init();

    void update();

    int16_t getDeltaX();

    int16_t getDeltaY();

private:

    Bitcraze_PMW3901 flow;

    int16_t deltaX;

    int16_t deltaY;

};

#endif // OPTICAL_FLOW_H