class Node{
    constructor(data, next = null){
        // a Node starts with a given data property
        // a Node also has a .next property initialized as null
        this.data = data
        this.next = next
    }
}

class LinkedList{
    constructor(head = null){
        // a Linked List starts with a "head" property intialized as null
        this.head = head
    }
    appendNode(data){
        // creates a new node with the given data and adds it to back of the list
        if (this.head == null) { // head is null, head is now new node
            this.head = new Node(data)
        } else {
            let nextNode = this.head
            // finds last node
            while (nextNode.next != null) {
                nextNode = nextNode.next
            }
            // append new last node
            nextNode.next = new Node(data)
        }
    }
    prependNode(data){
        // creates a new node with the given data and adds it to the front of the list
        if (this.head == null) {                            //  Linked List head = null     new head = new node
            this.head = new Node(data)
        } else {                                            //  Linked list head = head     new node = (data) ----> (this.head)-->(this is the next (data))--> null
            let newHeadNode = new Node(data, this.head)
            this.head = newHeadNode                         // Linked list head is now pointed to new Head
        }
    }
    pop(){
        // removes the last node from the list and returns it
        if (this.head == null) return null
        if (this.head.next == null) {   //  LIST =  (head) --> null
            let headNode = this.head
            this.head = null
            return headNode
        } else {                                        //  LIST =  (head) --> (node) --> ... (secondToLast) --> (last) --> null
            let nextNode = this.head                    
            let prevNode = this.head                    // set to this.head to take care of the case when there are only 2 elements  ...    (head) -- > (node) --> null
            while (nextNode.next != null) {             // finds last node
                if (nextNode.next != null)              // Only sets when nextNode.next != null so that we can always get the prev node
                prevNode = nextNode
                nextNode = nextNode.next
            }
            prevNode.next = null                        // remove last node
            return nextNode
        }
    }
    removeFromFront(){
        // remove the head node from the list and return it
        // the next node in the list is the new head node
        if (this.head == null) return null                                  // check if head is null, return null
        let headNode = new Node(this.head.data)                             // else get new node with head data
        this.head = this.head.next                                          // set new head (head = head.next)
        return headNode                                                     // return new headNode
    }
    insertAt(X, data){
        // insert a new node into the list with the given data
        // place it after X nodes in the list
        // if X exceeds the bounds of the list, put the node at the end
        // insertAt(0, 7) would add the new node as the head
        if (this.head == null) this.head = new Node(data)                   // head is null, new node set as head
        else if (X == 0) this.head = new Node(data, this.head)              // X is inserting as new head, set new head and next = this.head
        else {
            let nextNode = this.head                                        // iterate through linked list
            while (X > 1 && nextNode.next != null) {                        // loop while X > 1 (get second to last node) or get to end of list
                nextNode = nextNode.next
                X--
            }
            if (nextNode.next == null) nextNode.next = new Node(data)       // check if last node
            else {                                                          // else insert new node
                nextNode.next = new Node(data, nextNode.next)               // inserted node!
            }
        }
    }
    removeAt(X){
        // remove the Xth node from the list, considering 0 to be the first node
        // return the node that has been removed
        if (this.head == null) return null                                          // check if head is null, return null
        else if (X == 0){                                                           // remove first
            let headNode = new Node(this.head.data)
            this.head = this.head.next
            return headNode
        }
        else {                                                                      // else remove at X
            let count = 0
            let nextNode = this.head
            let prevNode = this.head                                                // set to this.head to take care of the case when there are only 2 elements  ...    (head) -- > (node) --> null
            while (nextNode.next != null && count != X) {                           // loop while X > 1 (get second to last node) or get to end of list
                if (nextNode.next != null)                                          // Only sets when nextNode.next != null so that we can always get the prev node
                    prevNode = nextNode
                nextNode = nextNode.next
                count++
            }
            if (nextNode == this.head) {                                            // only one element in list
                let removedNode = new Node(this.head.data)
                this.head = null
                return removedNode
            } else {                                                                // more than one element
                if (nextNode.next != null) prevNode.next = nextNode.next            // not last node
                else prevNode.next = null                                           // is last node
                return new Node(nextNode.data)
            }
        } 
    }
    search(data){
        // searches the list for a node with the given data
        // if it is found, return the "index" of the node, considering 0 to be the first node
        // if not, return false
        if (this.head == null) return false
        let count = 0
        let nextNode = this.head
        while (nextNode.next != null) {
            if (nextNode.data == data) return count
            else {
                nextNode = nextNode.next
                count++
            }
        }
        if (nextNode.data == data) return count
        return false
    }
    sort(){
        // sort the Linked List in ascending order of data values
        if (this.head) {
            let arr = []
            let nextNode = this.head
            while (nextNode.next != null) {
                arr.push(nextNode.data)
                nextNode = nextNode.next
                if (nextNode.next == null)
                    arr.push(nextNode.data)
            }
            arr.sort()
            let sortedLinkedList = new LinkedList()
            arr.forEach(elem => sortedLinkedList.appendNode(elem))
            this.head = sortedLinkedList.head
        }
    }
}

module.exports = {
    Node,
    LinkedList
}