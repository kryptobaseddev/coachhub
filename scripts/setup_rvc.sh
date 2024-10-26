#!/bin/bash

# Bring up the CAN interface
sudo ip link set can0 up type can bitrate 250000
