export const helloWorldGoGuide: string =
  `Here's how to write a Hello World program in Go (Golang): 
1. First, create a new file with a \`.go\` extension, for example \`hello.go\`
2. Here's the basic Hello World program:
\`\`\`go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
\`\`\`

Let's break down what each part does:

- \`package main\`: This declares that this is the main package. Every Go program must have a \`main\` package.
- \`import "fmt"\`: This imports the format package, which contains functions for formatted I/O.
- \`func main()\`: This is the entry point of the program.
- \`fmt.Println()\`: This is a function that prints text to the console and adds a new line.

3. To run the program, you have two options:

Option 1 - Direct run:
\`\`\`bash
go run hello.go
\`\`\`

Option 2 - Build and then run:
\`\`\`bash
go build hello.go
./hello  # On Unix/Linux/Mac
hello.exe  # On Windows
\`\`\`

The output will be:
\`\`\`
Hello, World!
\`\`\`

That's it! This is the simplest Go program you can write. As you learn more about Go, you can expand on this basic structure to create more complex applications.`;
