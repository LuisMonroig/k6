# K6 - Don't Make a Triangle! 🎲🔺 (React version)

## 🕹️ Game Overview

**K6** is a two-player strategy game where simplicity meets deep thinking.

### 🎯 Objective

Players take turns **claiming one edge** of a graph at a time. The twist?  
**The first player to form a triangle (three connected edges forming a cycle) loses the game.**  

Each move narrows the field and ramps up the tension. What begins as a simple graph quickly turns into a mental minefield!

---

## 🧠 Math Behind the Game

This game is based on a well-known idea from **combinatorial game theory** and **Ramsey theory**, and is played on the **complete graph with 6 nodes**, denoted as **K₆**.  

In K₆:
- Every node is connected to every other node.
- There are a total of **15 edges**.
- The challenge lies in avoiding the creation of a monochromatic triangle—a concept tied to foundational principles in **graph theory**.

---

## 💻 About This Folder

Contains the source code for an implementation of the **K6** game based on the stack React, Express, Nodejs, Postgress, Firebase for authentication and Docker. /**