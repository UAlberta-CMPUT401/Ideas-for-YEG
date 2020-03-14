#!/bin/bash
sudo cp -r ../backend/db ../../DB_Backup/
sudo docker-compose -f ../docker-compose.yml down
