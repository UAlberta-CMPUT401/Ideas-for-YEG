#!/bin/bash
sudo cp -r /home/ubuntu/Ideas-for-YEG/backend/db /home/ubuntu/DB_Backup/
sudo docker-compose -f /home/ubuntu/Ideas-for-YEG/docker-compose.yml down
