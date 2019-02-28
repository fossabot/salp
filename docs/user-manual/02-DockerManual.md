# SALP - Docker

## Docker installation  
Instructions to install docker on your system can be found [here.](https://docs.docker.com/install/)

## Containers
All docker containers which are realated to SALP will be prefixed with *salp*.
SALP uses the following schema to name containers.  
`<salp>_<course-name>_<image>`  

## Networks
SALP automatically creates a docker network which encapsuls the containers of a course.  
SALP uses the following schema to name networks.  
`<salp>_<course-name>_<network>`  

### Linked containers
All containers inside a network get linked to each other.  
For example, you have a container *wordpress* with a coresponding MySQL container with alias *db*, than you can reference to the database as *db* inside the *wordpress* installation. 

## Container crashed
If a container crashed or SALP crashed and you can't remove/stop the container using SALP, you can use the following commands to remove all SALP related containers and networks.

### List all containers
*docker ps -a*  

### Stop container
*docker stop `<containername>`*

### Remove container
*docker rm `<containername>`*

### List networks
*docker network ls*

### Remove network
*docker network rm `<networkname>`*

### Remove image
*docker rmi `<image:tag>`*

