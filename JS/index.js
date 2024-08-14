$.ajax({
    url:"http://localhost:1337/api/students",
    type:"GET",
    success:(result,status,xhr)=>
        {
            let student=result.data;
            console.log("Fetch Status:",status);
            let tr="";
            student.forEach(ele => 
            {
                let temp=ele.attributes;
                tr+=
                `
                <tr>
                <td scope="row">`+ele.id+`</td>
                <td>`+temp.Name+`</td>
                <td>`+temp.Email+`</td>
                <td>`+temp.DOB+`</td>
              </tr>
                `;
            });
            console.log(tr);
            $('.u_table1>tbody').append(tr);

            let tr1="";
            student.forEach(ele => 
            {
                let temp=ele.attributes;
                tr1+=
                `
                <tr>
                <td scope="row">`+ele.id+`</td>
                <td>`+temp.Name+`</td>
                <td>`+temp.Email+`</td>
                <td>`+temp.DOB+`</td>
                <td>
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-danger u_del">Delete</button>
                    </div>                
                </td>
              </tr>
                `;
            });
            $('.u_table2>tbody').append(tr1);

        },
    error:(xhr,status,error)=>
    {   
        if(status=="error")
            swal("Server Down", "Please try later", "error");
        console.error(error);
    }
});

$('table').click((e)=>
{
    if(e.target.classList.contains('u_del'))
    {
        let del_id=($(e.target).closest('tr').children('td').first().text());
        $.ajax
        ({
            url:"http://localhost:1337/api/students/"+del_id,
            type:"DELETE",
            success:(result,status,xhr)=>
                {
                    console.log("Delete Status:",status);
                    swal("Deleted!", "Selected data has been deleted, make sure to refresh page to reflect changes", "success");
                    $(e.target).closest('tr').remove();
                },
            error:(xhr,status,error)=>
            {
                if(status=="error")
                    swal("Server Down", "Please try later", "error");
                console.error(error);
            }
        });
    }
});

$('form').submit((e)=>
    {
        e.preventDefault();
        let n=($('input[name="fname"]').val());
        let email=($('input[name="e_mail"]').val());
        let dob=($('input[name="dob"]').val());
        let pass=($('input[name="pass"]').val());

        console.log(n,email,dob,pass);

        let d={
        data:
        {
            "Name": n,
            "Email": email,
            "DOB": dob,
            "Password": pass
        }};

        $.ajax(
            {
                url:"http://localhost:1337/api/students",
                type:"POST",
                data:d,
                
                success:(result,status,xhr)=>
                {
                    console.log("Status:",status);
                    swal("Done!", "Data posted on server successfuly\n(Check GET panel to view posted data, make sure to refresh page to reflect changes)", "success");
                },
                error:(xhr,status,error)=>
                {
                    if(status=="error")
                        swal("Server Down", "Please try later", "error");
                    console.error(error);
                    console.log("Status:",status);
                    console.log("Reponse:",xhr.responseText);
                }
            });
    });