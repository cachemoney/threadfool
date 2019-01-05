---
contentType: note
path: /abstract-factory
title: Abstract Factory Pattern
date: 2018-12-14T17:12:33.962Z
keywords: ['abstract factory pattern']
description: "a description of the abstract factory pattern"
hidden: false
---
The abstract factory pattern is used to provide a client with a set of related or dependant objects. The "family" of objects created by the factory are determined at run-time.

```java{numberLines: 5}
public class ShapeFactory extends AbstractFactory {
	
   @Override
   public Shape getShape(String shapeType){
   
      if(shapeType == null){
         return null;
      }		
      
      if(shapeType.equalsIgnoreCase("CIRCLE")){
         return new Circle();
         
      }else if(shapeType.equalsIgnoreCase("RECTANGLE")){
         return new Rectangle();
         
      }else if(shapeType.equalsIgnoreCase("SQUARE")){
         return new Square();
      }
      
      return null;
   }
   
   @Override
   Color getColor(String color) {
      return null;
   }
}
```