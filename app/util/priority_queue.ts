class PriorityQueue {
    private heap: number[];
  
    constructor() {
      this.heap = [];
    }
  
    private swap(i: number, j: number): void {
      const temp = this.heap[i];
      this.heap[i] = this.heap[j];
      this.heap[j] = temp;
    }
  
    private getParentIndex(index: number): number {
      return Math.floor((index - 1) / 2);
    }
  
    private getLeftChildIndex(index: number): number {
      return 2 * index + 1;
    }
  
    private getRightChildIndex(index: number): number {
      return 2 * index + 2;
    }
  
    private heapifyUp(): void {
      let currentIndex = this.heap.length - 1;
  
      while (currentIndex > 0) {
        const parentIndex = this.getParentIndex(currentIndex);
  
        if (this.heap[currentIndex] < this.heap[parentIndex]) {
          this.swap(currentIndex, parentIndex);
          currentIndex = parentIndex;
        } else {
          break;
        }
      }
    }
  
    private heapifyDown(): void {
      let currentIndex = 0;
  
      while (true) {
        const leftChildIndex = this.getLeftChildIndex(currentIndex);
        const rightChildIndex = this.getRightChildIndex(currentIndex);
        let smallestChildIndex = currentIndex;
  
        if (
          leftChildIndex < this.heap.length &&
          this.heap[leftChildIndex] < this.heap[smallestChildIndex]
        ) {
          smallestChildIndex = leftChildIndex;
        }
  
        if (
          rightChildIndex < this.heap.length &&
          this.heap[rightChildIndex] < this.heap[smallestChildIndex]
        ) {
          smallestChildIndex = rightChildIndex;
        }
  
        if (smallestChildIndex !== currentIndex) {
          this.swap(currentIndex, smallestChildIndex);
          currentIndex = smallestChildIndex;
        } else {
          break;
        }
      }
    }
  
    insert(value: number): void {
      this.heap.push(value);
      this.heapifyUp();
    }
  
    extractMin(): number | undefined {
      if (this.heap.length === 0) {
        return undefined;
      }
  
      if (this.heap.length === 1) {
        return this.heap.pop();
      }
  
      const minValue = this.heap[0];
      this.heap[0] = this.heap.pop() as number;
      this.heapifyDown();
  
      return minValue;
    }
  
    peekMin(): number | undefined {
      return this.heap.length > 0 ? this.heap[0] : undefined;
    }
  
    size(): number {
      return this.heap.length;
    }
  
    isEmpty(): boolean {
      return this.heap.length === 0;
    }
  }
  
//   Example usage:
//   const minHeap = new PriorityQueue();
//   minHeap.insert(4);
//   minHeap.insert(2);
//   minHeap.insert(8);
//   minHeap.insert(5);
//   minHeap.insert(1);
  
//   console.log("Min Heap:", minHeap);
//   console.log("Extracted Min Value:", minHeap.extractMin());
//   console.log("Min Heap after extraction:", minHeap);
  
  
export default PriorityQueue;
//   // Creating The Priority Queue
//   const PriQueue = new PriorityQueue();
  
//   // Adding the Elements
//   PriQueue.add(32);
//   PriQueue.add(45);
//   PriQueue.add(12);
//   PriQueue.add(65);
//   PriQueue.add(85);
  
//   console.log(PriQueue.peek());
//   console.log(PriQueue.remove());
//   console.log(PriQueue.peek());
//   console.log(PriQueue.remove());
//   console.log(PriQueue.peek());
//   console.log(PriQueue.remove());
  