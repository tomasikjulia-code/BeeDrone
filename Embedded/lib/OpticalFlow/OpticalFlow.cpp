#include "OpticalFlow.h"

OpticalFlowSensor::OpticalFlowSensor() : flow(CS_PIN), deltaX(0), deltaY(0){}

bool OpticalFlowSensor::init(){
    
    return flow.begin();
}

void OpticalFlowSensor::update(){

  flow.readMotionCount(&deltaX, &deltaY);

}

int16_t OpticalFlowSensor::getDeltaX(){

  return deltaX;
}

int16_t OpticalFlowSensor::getDeltaY(){

  return deltaY;
}

