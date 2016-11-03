var colors = {'3': '#e20b0b', '2': '#0ba024', '1': '#1250b5'},
    addedNodsNumber = 0,
    addedEdgesNumber = 0;

function changeTab(tab) {
  document.querySelectorAll('.tab').forEach(function(t) {
    t.style.display = 'none';
  });
  document.getElementById(tab).style.display = 'block';
}

sigma.classes.graph.addMethod('neighbors', function(nodeId) {
  var k,
      neighbors = {},
      index = this.allNeighborsIndex[nodeId] || {};

  for (k in index)
    neighbors[k] = this.nodesIndex[k];

  return neighbors;
});

sigma.classes.graph.addMethod('loadDataToEditForm', function(nodeData) {
  changeTab('edit-node-tab');
  var form = document.getElementById('node-edit-form');
      form.label.value = nodeData.label;
      form.node_id.value = nodeData.id;
      form.coord_x.value = nodeData.x;
      form.coord_y.value = nodeData.y;
  var opts = form.level.options;
  for(var opt, j = 0; opt = opts[j]; j++) {
    if(opt.value == nodeData.size) {
      form.level.selectedIndex = j;
      break;
    }
  }
  nodeData.attributes.forEach(function(attr) {
    form[attr.key].value = attr.value;
  });
});

sigma.classes.graph.addMethod('loadEdgeDataToEditForm', function(edgeData) {
  changeTab('edit-edge-tab');
  var form = document.getElementById('edge-edit-form'),
      sourceDOM = document.getElementById('edge-source-name-info'),
      targetDOM = document.getElementById('edge-target-name-info'),
      s = sigma.instances(0),
      source = s.graph.searchNode(edgeData.source),
      target = s.graph.searchNode(edgeData.target);

  form.edge_id.value = edgeData.id
  sourceDOM.innerHTML = source.label,
  targetDOM.innerHTML = target.label;

  edgeData.attributes.forEach(function(attr) {
    form[attr.key].value = attr.value;
  });
});

sigma.classes.graph.addMethod('searchNode', function(nodeId) {
  var node;
  this.nodes().forEach(function(n) {
    if(n.id == nodeId) {
      node = n;
    }
  });
  return node;
});

sigma.classes.graph.addMethod('searchEdge', function(edgeId) {
  var edge;
  this.edges().forEach(function(e) {
    if(e.id == edgeId) {
      edge = e;
    }
  });
  return edge;
});

sigma.classes.graph.addMethod('updateEdgesColor', function(nodeId, color) {
  this.edges().forEach(function(e) {
    if(e.source == nodeId || e.target == nodeId) {
      e.color = color;
      e.originalColor = color;
    }
  });
});

sigma.classes.graph.addMethod('updateNodeData', function() {
  console.log('update node');
  
  var s = sigma.instances(0),
      form = document.getElementById('node-edit-form'),
      nodeData = s.graph.searchNode(form.node_id.value);
  nodeData.label = form.label.value;
  nodeData.size = form.level.value;
  nodeData.x = form.coord_x.value;
  nodeData.y = form.coord_y.value;
  nodeData.color = colors[form.level.value];
  nodeData.originalColor = nodeData.color;
  nodeData.attributes.forEach(function(attr) {
    attr.value = form[attr.key].value;
  });
  s.graph.updateEdgesColor(form.node_id.value, '#e20b0b');
  s.refresh();
});

sigma.classes.graph.addMethod('updateEdgeData', function() {
  console.log('update edge');
  
  var s = sigma.instances(0),
      form = document.getElementById('edge-edit-form'),
      edgeData = s.graph.searchEdge(form.edge_id.value);
  edgeData.attributes.forEach(function(attr) {
    attr.value = form[attr.key].value;
  });
  //s.graph.updateEdgesColor(form.node_id.value, '#e20b0b');
  //s.refresh();
});

sigma.classes.graph.addMethod('addNewNode', function() {
  console.log('add new node');
  
  var s = sigma.instances(0),
      form = document.getElementById('node-new-form'),
      nodeData = {
        id: 'added_n_'+addedNodsNumber,
        label: form.label.value,
        size: form.level.value,
        color: colors[form.level.value],
        x: form.coord_x.value,
        y: form.coord_y.value,
        originalColor: colors[form.level.value],
        attributes: [
          {'key': 'attr_1', 'value': form.attr_1.value},
          {'key': 'attr_2', 'value': form.attr_2.value},
          {'key': 'attr_3', 'value': form.attr_3.value},
          {'key': 'attr_4', 'value': form.attr_4.value}
        ]
      };

  addedNodsNumber++;
  s.graph.addNode(nodeData);
  s.refresh();
});

sigma.classes.graph.addMethod('addNewEdge', function() {
  console.log('add new edge');

  var s = sigma.instances(0),
      form = document.getElementById('new-edge-form'),
      node = s.graph.searchNode(form.source_node.value),
      edgeData = {
        id: 'added_e_'+addedEdgesNumber,
        color: "#e20b0b",
        originalColor: "#e20b0b",
        source: form.source_node.value,
        target: form.target_node.value,
        size: 1,
        attributes: [
          {'key': 'attr_1', 'value': form.attr_1.value},
          {'key': 'attr_2', 'value': form.attr_2.value},
          {'key': 'attr_3', 'value': form.attr_3.value},
          {'key': 'attr_4', 'value': form.attr_4.value}
        ]
      };

  addedEdgesNumber++;
  s.graph.addEdge(edgeData);
  s.refresh();
});

sigma.classes.graph.addMethod('confirmEdgeRemove', function(edgeData) {
  console.log('confirmEdgeRemove');
  
  if(confirm('Do you want to remove this edge?')) {
    console.log('remove edge', edgeData);
    var s = sigma.instances(0);
    s.graph.dropEdge(edgeData.id);
    s.refresh();
  }
});

sigma.classes.graph.addMethod('confirmNodeRemove', function(nodeData) {
  console.log('confirmNodeRemove');
  
  if(confirm('Do you want to remove this node?')) {
    console.log('remove node', nodeData);
    var s = sigma.instances(0);
    s.graph.dropNode(nodeData.id);
    s.refresh();
  }
});

sigma.parsers.json('data.json', {
  renderer: {
    container: 'container',
    type: 'canvas'
  },
  settings: {
    defaultNodeColor: '#ec5148',
    doubleClickEnabled: false,
    enableEdgeHovering: true,
    edgeHoverColor: 'edge',
    defaultEdgeHoverColor: '#000',
    edgeHoverSizeRatio: 1.5
  }
}, function(s) {
  // coloring
  s.graph.nodes().forEach(function(n) {
    n.originalColor = n.color;
  });
  s.graph.edges().forEach(function(e) {
    e.originalColor = e.color;
  });
  
  
  //nodes
  s.graph.nodes().forEach(function(n, i) {
    console.log('node', i, n);
  });
  
  s.bind('clickNode', function(e) {
    var nodeId = e.data.node.id,
        toKeep = s.graph.neighbors(nodeId);
    toKeep[nodeId] = e.data.node;
    
    s.graph.nodes().forEach(function(n) {
      if (toKeep[n.id])
        n.color = n.originalColor;
      else
        n.color = '#eee';
    });

    s.graph.edges().forEach(function(e) {
      if (toKeep[e.source] && toKeep[e.target])
        e.color = e.originalColor;
      else
        e.color = '#eee';
    });

    // Since the data has been modified, we need to
    // call the refresh method to make the colors
    // update effective.
    s.refresh();

    s.graph.loadDataToEditForm(e.data.node);
  });
  
  s.bind('clickEdge', function(e) {
    var edgeId = e.data.edge.id;
    s.graph.edges().forEach(function(e) {
      if (e.id == edgeId)
        e.color = e.originalColor;
      else
        e.color = '#eee';
    });
    s.refresh();

    s.graph.loadEdgeDataToEditForm(e.data.edge);
  });
  
  s.bind('rightClickEdge', function(e) {
    s.graph.confirmEdgeRemove(e.data.edge);
  });
  
  
  s.bind('rightClickNode', function(e) {
    s.graph.confirmNodeRemove(e.data.node);
  });

  s.bind('clickStage', function(e) {
    changeTab('info-tab');
    s.graph.nodes().forEach(function(n) {
      n.color = n.originalColor;
    });

    s.graph.edges().forEach(function(e) {
      e.color = e.originalColor;
    });

    // Same as in the previous event:
    s.refresh();
  });
});

function resetForm(form) {
  //reset form
  form.attr_1.value = null;
  form.attr_2.value = null;
  form.attr_3.value = null;
  form.attr_4.value = null;
}

function updateNodeData() {
  sigma.instances(0).graph.updateNodeData();
}

function updateEdgeData() {
  sigma.instances(0).graph.updateEdgeData();
}

function AddNewNode() {
  sigma.instances(0).graph.addNewNode();
}

function AddNewEdge() {
  sigma.instances(0).graph.addNewEdge();
}

function newNode() {
  var form = document.getElementById('node-new-form');
  resetForm(form);
  changeTab('new-node-tab');
}

function newConnection() {
  var s = sigma.instances(0),
      form = document.getElementById('new-edge-form'),
      nodes = s.graph.nodes();
  
  var optionsHTML = '';
  nodes.forEach(function(n) {
    optionsHTML += '<option value="' + n.id + '">' + n.label + '</option>';
  });
  
  form.source_node.innerHTML = optionsHTML;
  form.target_node.innerHTML = optionsHTML;
  
  resetForm(form);

  
  changeTab('new-edge-tab');
}