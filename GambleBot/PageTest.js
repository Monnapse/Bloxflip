function Call()
{
    console.log("Hello");
    setTimeout(Call, 500);
}

Call();