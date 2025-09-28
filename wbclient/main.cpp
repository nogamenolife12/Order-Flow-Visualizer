#include "App.h"
#include <iostream>

struct PerSocketData {};  // Must be complete type

int main() {
    uWS::App().ws<PerSocketData>("/*", {
        .open = [](auto* ws) {
            std::cout << "Connection opened!" << std::endl;
        },
        .message = [](auto* ws, std::string_view message, uWS::OpCode opCode) {
            std::cout << "Received message: " << message << std::endl;
            ws->send(message, opCode); // echo back
        },
        .close = [](auto* ws, int code, std::string_view msg) {
            std::cout << "Connection closed!" << std::endl;
        }
    }).listen(9001, [](auto* token) {
        if (token) {
            std::cout << "Listening on port 9001" << std::endl;
        } else {
            std::cout << "Failed to listen on port 9001" << std::endl;
        }
    }).run();

    std::cout << "Server has stopped running." << std::endl;
}
