(function(GHTeam, $, undefined) {
	var parent = new Base();

	var gHTeam = null;
	var instance = function() {
		gHTeam = this;
	};

	instance.prototype = parent;
	instance.prototype.constructor = Base;

	$.extend(true, instance.prototype, {

    _documentReadyFunctions : {
		gHTeam_documentReady : function(_instance) {
          var gHTeam = _instance;

            var team_list = $('#team_list').DataTable({
                ajax: '/users/list',
                columnDefs:[
                    {
                        "targets": [0],
                        "render": function(data, type, full, meta){
                            return "<a href='javascript:;' class='team_workers' id='"+full[1]+"' data-name='"+full[0]+"' style='color: #000;'>"+full[0]+"</a>";
                        }
                    },
                    {

                        "targets": [1],
                            "render": function(data, type, full, meta){
                                var link = '<a href="javascript:;" class="btn btn-simple btn-warning btn-icon team-edit" data-id="'+ full[1] +'" data-name="'+ full[0] +'" title="Edit"><i class="ti-pencil-alt"></i></a>'+
                                        '<a href="javascript:;" class="btn btn-simple btn-warning btn-icon team-remove" data-id="'+ full[1] +'" data-name="'+ full[0] +'" title="Delete"><i class="ti-trash"></i></a>';
                                        return link;
                            }
                    }
                ]
            });
            $('#ghTeamModal').modal({show: false});	
            $(document).on('click', 'a.team-edit', function(e){
                e.preventDefault();
                $('#team_name').val( $(this).data('name') );
                $('#team_id').val( $(this).data('id') );
                $('#ghTeamModal').modal('show');
            });

            $('#team_add').click(function(e){
                e.preventDefault();
                $('#team_name').val('');
                $('#team_id').val('');
                $('#ghTeamModal').modal('show');
            });

            $(document).on('click', 'button#team_update', function(e){
                e.preventDefault();
                var params = { id: $('#team_id').val(), name: $('#team_name').val() };
                $.post(gHTeam._team_add_url, params, function(data){
                    team_list.ajax.reload();
                    $('#ghTeamModal').modal('hide');
                }).error(function(data){
                    $('#ghTeamModal').modal('hide');
                    var obj = JSON.parse(data.responseText);
                    alert(obj.error.description);
                });
            });

            $(document).on('click', 'a.team-remove', function(e){
                e.preventDefault();
                var _team_delete_url = '/admin/teams/delete/'+$(this).data('id');
                var conf = confirm('Are you sure to delete: '+$(this).data('name'));
                if(conf){
                    $.ajax({
                        url: _team_delete_url,
                        type: 'DELETE',
                        success: function(data){
                            team_list.ajax.reload();
                        }
                    }).error(function(data){
                        var obj = JSON.parse(data.responseText);
                        alert(obj.error.description);
                    });
                }
                
            });

            var members = $('#members_list').DataTable({
                processing: true,
                responsive: true,
                ajax: ''
            });

            $('#ghTeamListModal').modal({show: false});	
            $(document).on('click', 'a.team_workers', function	(e){
                $('#team_name_label').text( $(this).data('name') );
                var _url = gHTeam._team_workers_url+"/"+ $(this).prop('id');
                $('#ghTeamListModal').modal('show');
                members.ajax.url(_url).load();
            });

            
        }
      }

  });

	window.GHTeam = instance;
}(window.GHTeam = window.GHTeam || {}, jQuery));

var ghTeam = new GHTeam();
ghTeam.documentReady();