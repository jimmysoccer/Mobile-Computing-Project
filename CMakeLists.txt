cmake_minimum_required(VERSION 3.10)
project(Mobile_Computing_Project)

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(cpprestsdk_DIR /usr/lib/${CMAKE_LIBRARY_ARCHITECTURE}/cmake/)
find_package(cpprestsdk REQUIRED)

set_target_properties(cpprestsdk::cpprestsdk_openssl_internal PROPERTIES
        INTERFACE_COMPILE_DEFINITIONS "CPPREST_NO_SSL_LEAK_SUPPRESS"
        INTERFACE_LINK_LIBRARIES "OpenSSL::SSL"
        )

add_executable(Mobile_Computing_Project
        main.cpp
        services.cpp
        rest.hpp)
target_link_libraries(Mobile_Computing_Project PRIVATE cpprestsdk::cpprest wiringPi boost_system)