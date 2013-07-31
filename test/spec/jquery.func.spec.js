describe("$.reverse", function() {
  var $obj;
  
  it("should reverse a jQuery object", function() {
    $obj = $('<div id="id-1"></div><div id="id-2"></div><div id="id-3"></div>');
    $obj.reverse();
    expect($obj.eq(0).attr("id")).toBe("id-3");
    $obj.reverse();
    expect($obj.eq(0).attr("id")).toBe("id-1");
  });
  
});

describe("$.fn.any", function() {
  var $obj;
  
  it("should return false if the iterator returns false for all elements", function() {
    $obj = $('<div></div><div></div><div></div>');
    
    expect($obj.any(function() {
      return false;
    })).toBe(false);
  });
  
  it("should return true if the iterator returns true for one or more elements", function() {
    $obj = $('<div></div><div></div><span></span><div></div>');
    
    expect($obj.any(function() {
      return $(this).is("span");
    })).toBe(true);
  });
  
  it("should return false for an empty jQuery object", function() {
    $obj = $();
    
    var trueFn = function() { 
      return true 
    };
    
    expect($obj.any(trueFn)).toBe(false);
  });
});

describe("$.fn.all", function() {
  var $obj;
  
  it("should return true if the iterator returns true for all elements", function() {
    $obj = $([1, 2, 3]);
    
    expect($obj.all(function() {
      return true;
    })).toBe(true);
  });
  
  it("should return false if the iterator returns false on one or more elements", function() {
    $obj = $('<div class="a"></div><div class="a"></div><div class="b"></div>');
    
    expect($obj.all(function() {
      return $(this).hasClass("a");
    })).toBe(false);
  });
  
  it("should return false for an empty jQuery object", function() {
    $obj = $();
    
    var trueFn = function() { 
      return true 
    };
    
    expect($obj.all(trueFn)).toBe(false);
  });
});

describe("$.fn.intercept", function() {
  var $obj;
  
  it("should invoke the interceptor without changing the current object", function() {
    $obj = $("<div>");
    
    var intercepted = $obj.intercept(function(obj) {
      expect(this).toBe($obj);
      expect(obj).toBe($obj);
    });
    
    expect(intercepted).toBe($obj);
  });
});

describe("$.method", function() {
  var $objA;
  var $objB;
  
  it("should give the same result if the same method is called normally", function() {
    $objA = $('<div></div><div></div><div></div>');
    $objB = $('<div></div><div></div><div></div>');
    
    var method = $.method("addClass", "a");
    
    var resultA = $objA.addClass("a");
    var resultB = method.apply($objB);
    
    var i;
    for(i = 0; i < 3; i++) {
      expect(resultA[i].className).toBe(resultB[i].className);
    }
  });
  
  it("should be usable with $.fn.all", function() {
    $objA = $('<div class="a"></div><div class="a"></div><div class="a"></div>');
    
    var method = $.method("hasClass", "a");
    
    expect($objA.all(method)).toBe(true);    
  });
  
});

describe("$.fn.invoke", function() {
  var $objA;
  var $objB;
  
  it("should give the same result as $.method + $.fn.map", function() {
    $objA = $('<div id="id-1"></div>');
    $objB = $('<div id="id-1"></div>');
    
    var resultA = $objA.invoke("attr", "id");
    var resultB = $objB.map($.method("attr", "id"));
    
    expect(resultA[0]).toBe("id-1");
    expect(resultB[0]).toBe("id-1");
  });
  
});
