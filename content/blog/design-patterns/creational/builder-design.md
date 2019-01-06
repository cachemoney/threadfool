---
title: Builder Design Pattern
date: 2019-01-6T17:12:33.962Z
contentType: note
keywords: ['builder design pattern']
description: "The builder pattern is used to help build objects step by step"
published: true
---
## Description
* Separate the construction of a complex object from its representation so that the same construction process can create different representations.
* Parse a complex representation, create one of several targets.

## When to Use
* If the algorithm for creating a complex object is not tightly coupled to the components that make of the object and how it is created
* Construction of objects should allow the making of different representations of that object

```java
import java.util.Date;

public class Form {
    private String firstName,lastName, userName, email;

    public static class FormBuilder {
        private String firstName, lastName, userName, email;

        public FormBuilder(String firstName, String lastName, String userName){
            this.firstName = firstName;
            this.lastName = lastName;
            this.userName = userName;

        }

        public FormBuilder email(String email){
            this.email = email;
            return this;
        }

        public Form build(){
            return new Form(this);
        }
    }
    private Form(FormBuilder formBuilder){
        this.firstName = formBuilder.firstName;
        this.lastName = formBuilder.lastName;
        this.userName = formBuilder.userName;
        this.email = formBuilder.email;
    }
    @Override
    public String toString(){
        StringBuilder sb = new StringBuilder();
        sb.append(" First Name: ");
        sb.append(firstName);
        sb.append("\n Last Name: ");
        sb.append(lastName);
        sb.append("\n User Name: ");
        sb.append(userName);
        if(this.email!=null){
            sb.append("\n Email: ");
            sb.append(email);
        }
        return sb.toString();
    }
    public static void main(String[] args) {
        Form form = new Form.FormBuilder("Roger", "Dodger", "RoDodge")
               .build();
                System.out.println(form);
    }
}
```