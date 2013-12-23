# The name of your app.
# NOTICE: name defined in TARGET has a corresponding QML filename.
#         If name defined in TARGET is changed, following needs to be
#         done to match new name:
#         - corresponding QML filename must be changed
#         - desktop icon filename must be changed
#         - desktop filename must be changed
#         - icon definition filename in desktop file must be changed
TARGET = sailfish-fash-fosh

CONFIG += sailfishapp

SOURCES += src/sailfish-fash-fosh.cpp \
    src/tictactoeboard.cpp

OTHER_FILES += qml/sailfish-fash-fosh.qml \
    qml/cover/CoverPage.qml \
    qml/pages/FirstPage.qml \
    qml/pages/SecondPage.qml \
    rpm/sailfish-fash-fosh.spec \
    rpm/sailfish-fash-fosh.yaml \
    sailfish-fash-fosh.desktop \
    qml/tictactoemodel.js \
    qml/Space.qml \
    qml/TicTacToeBoard.qml \
    README.rst

HEADERS += \
    src/tictactoeboard.h

