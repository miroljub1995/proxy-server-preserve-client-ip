package main

import (
        "fmt"
        "net"
)

func main() {
		ln, err := net.Listen("tcp", ":8090")
		if err != nil {
			fmt.Println(err)
            return
		}
		for {
			conn, err := ln.Accept()
			if err != nil {
				fmt.Println(err)
            	return
			}
			fmt.Printf("Received from: %v\n", conn.RemoteAddr())
		}
}
    