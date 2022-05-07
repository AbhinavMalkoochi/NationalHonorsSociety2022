#include <iostream>
using namespace std;
class A{
public:
int main(){
    question1(28);

}
void question1(int k){
    if(k<40){
        cout<<k<<" ";
        question1(k+4);
    }
    cout << k << " ";
}
};
